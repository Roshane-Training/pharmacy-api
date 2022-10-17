require('dotenv/config')
const { ErrorResponse, SuccessResponse } = require('../lib/helpers')
const User = require('../models/user')
const path = require('path')
const fs = require('fs')

const USER_SELECT_FILTER = '-password -__v'

class UserController {
	/**
	 * Create One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		const uploadedImagePath = path.resolve(req.file.path)
		const uploadedImage = path
			.join(path.dirname(req.file.path), path.basename(req.file.path))
			.replace('public', '')
			.replaceAll('\\', '/') // image/CURRENT_TIME_original_file_name.jpg

		const fileType = req.file.mimetype

		let createdUser
		const { firstName, lastName, email, phoneNumber, password } = req.body

		try {
			if (fileType.startsWith('image/') === false) {
				deleteFile(uploadedImagePath)
				return ErrorResponse(res, null, 'invalid upload file type')
			}

			createdUser = await User.create({
				firstName,
				lastName,
				email,
				phoneNumber,
				password,
				image: uploadedImage,
			})
		} catch (error) {
			// delete uploaded image by multer if there's an error in creation
			deleteFile(uploadedImagePath)

			const message = new String(error.message)
			const respMessage = 'this email is being used'

			let errors = []
			let duplicateEmail = ''

			// this handles common errors
			errors = message.replace('users validation failed: ', '').split(', ')

			// this handles duplicated email
			if (message.includes('E11000') && message.includes('email')) {
				return ErrorResponse(res, [], respMessage, 400)
			}

			return ErrorResponse(res, errors, 'error creating user', 400)
		}

		// selecting specific things to display to the user
		let _createdUser = createdUser.toObject()
		// TODO to be refractored, this is a messy way to handle it
		delete _createdUser._id
		delete _createdUser.__v
		delete _createdUser.password

		return SuccessResponse(res, _createdUser, 'user created', 201)
	}

	/**
	 * Get All Resources
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		let users

		try {
			users = await User.find().select(USER_SELECT_FILTER)
		} catch (error) {
			return ErrorResponse(res, 'error finding users with model', error)
		}

		if (!users || users.length <= 0)
			return SuccessResponse(res, 'users are empty at the moment', users)

		return SuccessResponse(res, 'users found', users)
	}

	/**
	 * Get One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		let user

		try {
			user = await User.findById(req.params.id).select(USER_SELECT_FILTER)
		} catch (error) {
			return ErrorResponse(res, 'error finding user with model', error)
		}

		if (!user) return SuccessResponse(res, 'user not found', user)

		return SuccessResponse(res, 'user found', user)
	}

	/**
	 * Update One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { email, role, password } = req.body
		const { id: _id } = req.params

		if (!email && !role && !password)
			return ErrorResponse(res, 'nothing sent to update', null, 200)

		let user

		try {
			user = await User.findOne({ _id })
		} catch (error) {
			return ErrorResponse(res, 'error while trying to find user', error)
		}

		if (!user) return ErrorResponse(res, `no user found`)

		const updatedUser = await User.updateOne(
			{ _id },
			{ email, password, role },
			{ returnDocument: true, returnOriginal: true, new: true }
		).catch((error) => {
			return ErrorResponse(res, 'error updating user', error)
		})

		return SuccessResponse(res, 'user updated', updatedUser)
	}

	/**
	 * Delete One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		let user = await User.findByIdAndRemove(req.params.id, {
			returnDocument: true,
		}).catch((error) => {
			return ErrorResponse(res, 'error deleting with user model', error)
		})

		if (!user) return ErrorResponse(res, 'user not found', null)

		return SuccessResponse(res, 'user deleted', user.email)
	}
}

function deleteFile(filePath) {
	console.log(
		`${path.basename(__filename)} :: User creation error deleting - ${filePath}`
	)

	fs.rmSync(filePath)
}

module.exports = UserController
