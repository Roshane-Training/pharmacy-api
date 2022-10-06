const mongoose = require('mongoose')
const User = require('../models/user')
const db = require('../lib/db.util')
const { ErrorResponse, SuccessResponse } = require('../lib/helpers')

const USER_SELECT_FILTER = '-password -__v'

class UserController {
	/**
	 * Create One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		let createdUser

		try {
			createdUser = await db.createOne(User, req.body)
		} catch (error) {
			return ErrorResponse(
				res,
				[...error.message.replace('users validation failed: ', '').split(', ')],
				'error creating user',
				400
			)
		}

		return SuccessResponse(res, 'user created', createdUser, 201)
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

module.exports = UserController
