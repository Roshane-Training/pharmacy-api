require('dotenv/config')
const { ErrorResponse, SuccessResponse } = require('../lib/helpers')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const USER_SELECT_FILTER = ''

class UserController {
	/**
	 * Create One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		// if (!req.file) return ErrorResponse(res, 'please select an image', 400)

		const maximum_file_szie = 563_200 // 550 Kilobytes (KB)
		const fileType = req.file && req.file.mimetype

		let createdUser
		const { fullName, email, phoneNumber, password } = req.body

		try {
			// file type validation
			if (fileType && fileType.startsWith('image/') === false) {
				return ErrorResponse(res, null, 'invalid upload file type')
			}

			//Check if the file size is larger than 500000 bytes(0.5MB)
			if (req.file && req.file.size > maximum_file_szie) {
				return ErrorResponse(
					req,
					res,
					`file too large, ensure images are ${formatBytes(
						maximum_file_szie
					)} or less. Your file is ${formatBytes(req.file.size)}.`,
					null,
					400
				)
			}

			createdUser = await User.create({
				fullName,
				email,
				phoneNumber,
				password,
				image: {
					data: Buffer.from(req?.file?.buffer ?? Buffer.from('no image')),
					contentType: req.file && req.file.mimetype,
				},
			})
		} catch (error) {
			//  if there's an error in creation

			const message = new String(error.message)
			const respMessage = 'this email is being used'

			let errors = []

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
		delete _createdUser.__v
		delete _createdUser.image

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
			return ErrorResponse(res, error, 'error finding users with model')
		}

		if (!users || users.length <= 0)
			return SuccessResponse(res, users, 'users are empty at the moment')

		return SuccessResponse(res, users, 'users found')
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
			return ErrorResponse(res, error, 'error finding user with model')
		}

		if (!user) return SuccessResponse(res, user, 'user not found')

		return SuccessResponse(res, user, 'user found')
	}

	/**
	 * Update One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		let { fullName, phoneNumber, email, password, role } = req.body
		const { id } = req.params

		const isFieldsEmpty = Object.values(req.body).every(
			(val) => val == '' || val == null
		)

		if (isFieldsEmpty) return ErrorResponse(res, null, 'nothing to update', 200)

		let user

		try {
			user = await User.findOne({ id })
		} catch (error) {
			return ErrorResponse(res, error, 'error while trying to find user')
		}

		if (!user) return ErrorResponse(res, `no user found`)

		password = bcrypt.hashSync(password, 10)

		let updatedUser

		try {
			updatedUser = await User.updateOne(
				{ id },
				{ fullName, phoneNumber, email, role, password },
				{ new: true }
			)
		} catch (error) {
			return ErrorResponse(res, error, 'error updating user')
		}

		return SuccessResponse(res, updatedUser, 'user updated')
	}

	/**
	 * Delete One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		let user

		try {
			user = await User.findByIdAndRemove(req.params.id, {
				returnDocument: true,
			})
		} catch (error) {
			return ErrorResponse(res, error, 'error deleting with user model')
		}

		if (!user) return ErrorResponse(res, null, 'user not found')

		return SuccessResponse(res, user, 'user deleted')
	}
}

module.exports = UserController
