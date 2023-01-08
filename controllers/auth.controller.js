const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Doctor = require('../models/doctor')

const { generateAccessToken, ErrorResponse, SuccessResponse } = require('../lib/helpers')

class AuthController {
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static login = async (req, res) => {
		let { email, password } = req.body
		let existingUser
		let token

		const unknownError = 'error! something went wrong on our end.'

		// Fetch user from database
		try {
			existingUser = await User.findOne({ email: email }).select('-image')
		} catch (error) {
			return ErrorResponse(req, res, unknownError, error)
		}

		// Check if no user is returned
		if (!existingUser) {
			return ErrorResponse(req, res, null, "we couldn't find your account", 404)
		}

		// Check if password matches the record found
		const isValidLogin = bcrypt.compareSync(password, existingUser.password)

		if (isValidLogin === false) {
			return ErrorResponse(req, res, null, 'invalid credentials')
		} else {
			token = generateAccessToken({
				_id: existingUser.id,
			})

			//remove password before returning the response
			const _existingUser = existingUser.toObject()
			delete _existingUser.password

			return SuccessResponse(
				res,
				{
					token,
					user: _existingUser,
				},
				'login successful'
			)
		}
	}

	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static loginDoctor = async (req, res) => {
		let { email, password } = req.body
		let existingUser
		let token

		const unknownError = 'error! something went wrong on our end.'

		existingUser = await Doctor.findOne({ email: email }).catch((error) => {
			return ErrorResponse(req, res, unknownError, error)
		})

		if (!existingUser) {
			return ErrorResponse(req, res, null, "we couldn't find your doctor account", 404)
		}

		const isValidLogin = bcrypt.compareSync(password, existingUser.password)

		if (isValidLogin === false) {
			return ErrorResponse(req, res, null, 'invalid credentials')
		} else {
			token = generateAccessToken({
				_id: existingUser.id,
			})

			//remove password before returning the response
			const _existingUser = existingUser.toObject()
			delete _existingUser.password

			return SuccessResponse(
				res,
				{
					token,
					user: _existingUser,
				},
				'doctor login successful'
			)
		}
	}

	/**
	 * Get Authenticated User
	 * @param {request} req
	 * @param {response} res
	 */
	static getAuthUser = async (req, res) => {
		// this function requires the auth middleware
		const { _id } = req.user //deconstruct authenticated user's id

		try {
			const authUser = await User.findById(_id).select('_id email role')
			return SuccessResponse(req, res, authUser, undefined)
		} catch (error) {
			return ErrorResponse(req, res, error, 'error finding auth user', 404)
		}
	}

	/**
	 * Get Token Info
	 * @param {request} req
	 * @param {response} res
	 */
	static decodeToken = async (req, res) => {
		// Get token from auth header
		const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

		// token not found
		if (!token) return ErrorResponse(req, res, null, 'token not found', 404)

		const decodedToken = jwt.decode(token, { complete: true, json: true })

		if (decodedToken == null)
			return ErrorResponse(req, res, null, 'this token might be invalid', 500)
		return SuccessResponse(req, res, decodedToken.payload, 'token decoded')
	}
}

module.exports = AuthController
