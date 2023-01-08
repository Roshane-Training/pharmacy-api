require('dotenv/config')
const { ErrorResponse, SuccessResponse } = require('../lib/helpers')
const Doctor = require('../models/doctor')
const path = require('path')
const bcrypt = require('bcryptjs')
const { deleteS3File } = require('../lib/helpers')

const DOCTOR_SELECT_FILTER = ''

class DoctorController {
	/**
	 * Create One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		if (!req.file) return ErrorResponse(req, res, 'please select an image', 400)

		const maximum_file_szie = 563_200 // 550 Kilobytes (KB)
		const fileType = req.file.mimetype

		let createdDoctor
		const {
			fullName,
			title,
			ratings,
			patients,
			experience,
			about,
			email,
			phoneNumber,
			password,
		} = req.body

		try {
			// file type validation
			if (fileType.startsWith('image/') === false) {
				return ErrorResponse(req, res, null, 'invalid upload file type')
			}

			//Check if the file size is larger than 500000 bytes(0.5MB)
			if (req.file.size > maximum_file_szie) {
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
			createdDoctor = await Doctor.create({
				fullName,
				title,
				ratings,
				patients,
				experience,
				about,
				email,
				phoneNumber,
				password,
				image: {
					data: Buffer.from(req.file.buffer),
					contentType: req.file.mimetype,
				},
			})
		} catch (error) {
			const message = new String(error.message)
			const respMessage = 'this email is being used'

			let errors = []

			// this handles common errors
			errors = message.replace('doctors validation failed: ', '').split(', ')

			// this handles duplicated email
			if (error.code == E11000 && error.keyValue.email) {
				respMessage = `'${error.keyValue.email}' is being used`
				return ErrorResponse(req, res, [], respMessage, 400)
			}

			return ErrorResponse(req, res, errors, 'error creating doctor', 400)
		}

		// selecting specific things to display to the doctor
		let _createdDoctor = createdDoctor.toObject()
		delete _createdDoctor.__v

		return SuccessResponse(req, res, _createdDoctor, 'doctor created', 201)
	}

	/**
	 * Get All Resources
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		let doctors

		try {
			doctors = await Doctor.find().select(DOCTOR_SELECT_FILTER)
		} catch (error) {
			return ErrorResponse(req, res, error, 'error finding doctors with model')
		}

		if (!doctors || doctors.length <= 0)
			return SuccessResponse(req, res, doctors, 'doctors are empty at the moment')

		return SuccessResponse(req, res, doctors, 'doctors found')
	}

	/**
	 * Get One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		let doctor

		try {
			doctor = await Doctor.findById(req.params.id).select(DOCTOR_SELECT_FILTER)
		} catch (error) {
			return ErrorResponse(req, res, error, 'error finding doctor with model')
		}

		if (!doctor) return SuccessResponse(req, res, doctor, 'doctor not found')

		return SuccessResponse(req, res, doctor, 'doctor found')
	}

	/**
	 * Update One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		let {
			fullName,
			title,
			ratings,
			patients,
			experience,
			about,
			phoneNumber,
			email,
			password,
			role,
		} = req.body
		const { id } = req.params

		const isFieldsEmpty = Object.values(req.body).every(
			(val) => val == '' || val == null
		)

		if (isFieldsEmpty) return ErrorResponse(req, res, null, 'nothing to update', 200)

		let doctor

		try {
			doctor = await Doctor.findOne({ id })
		} catch (error) {
			return ErrorResponse(req, res, error, 'error while trying to find doctor')
		}

		if (!doctor) return ErrorResponse(req, res, `no doctor found`)

		password = bcrypt.hashSync(password, 10)

		let updatedDoctor

		try {
			updatedDoctor = await Doctor.updateOne(
				{ id },
				{
					fullName,
					title,
					ratings,
					patients,
					experience,
					about,
					phoneNumber,
					email,
					role,
					password,
				},
				{ new: true }
			)
		} catch (error) {
			return ErrorResponse(req, res, error, 'error updating doctor')
		}

		return SuccessResponse(req, res, updatedDoctor, 'doctor updated')
	}

	/**
	 * Delete One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		let doctor

		try {
			doctor = await Doctor.findByIdAndRemove(req.params.id, {
				returnDocument: true,
			})
		} catch (error) {
			return ErrorResponse(req, res, error, 'error deleting with doctor model')
		}

		if (!doctor) return ErrorResponse(req, res, null, 'doctor not found')

		return SuccessResponse(req, res, doctor, 'doctor deleted')
	}
}

module.exports = DoctorController
