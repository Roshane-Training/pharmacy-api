require('dotenv/config')
const { ErrorResponse, SuccessResponse } = require('../lib/helpers')
const Doctor = require('../models/doctor')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')

const DOCTOR_SELECT_FILTER = ''

class DoctorController {
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
				deleteFile(uploadedImagePath)
				return ErrorResponse(res, null, 'invalid upload file type')
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
				image: uploadedImage,
			})
		} catch (error) {
			// delete uploaded image by multer if there's an error in creation
			deleteFile(uploadedImagePath)

			const message = new String(error.message)
			const respMessage = 'this email is being used'

			let errors = []

			// this handles common errors
			errors = message.replace('doctors validation failed: ', '').split(', ')

			// this handles duplicated email
			if (message.includes('E11000') && message.includes('email')) {
				return ErrorResponse(res, [], respMessage, 400)
			}

			return ErrorResponse(res, errors, 'error creating doctor', 400)
		}

		// selecting specific things to display to the doctor
		let _createdDoctor = createdDoctor.toObject()
		delete _createdDoctor.__v

		return SuccessResponse(res, _createdDoctor, 'doctor created', 201)
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
			return ErrorResponse(res, error, 'error finding doctors with model')
		}

		if (!doctors || doctors.length <= 0)
			return SuccessResponse(res, doctors, 'doctors are empty at the moment')

		return SuccessResponse(res, doctors, 'doctors found')
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
			return ErrorResponse(res, error, 'error finding doctor with model')
		}

		if (!doctor) return SuccessResponse(res, doctor, 'doctor not found')

		return SuccessResponse(res, doctor, 'doctor found')
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

		if (isFieldsEmpty) return ErrorResponse(res, null, 'nothing to update', 200)

		let doctor

		try {
			doctor = await Doctor.findOne({ id })
		} catch (error) {
			return ErrorResponse(res, error, 'error while trying to find doctor')
		}

		if (!doctor) return ErrorResponse(res, `no doctor found`)

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
			return ErrorResponse(res, error, 'error updating doctor')
		}

		return SuccessResponse(res, updatedDoctor, 'doctor updated')
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
			return ErrorResponse(res, error, 'error deleting with doctor model')
		}

		if (!doctor) return ErrorResponse(res, null, 'doctor not found')

		return SuccessResponse(res, doctor, 'doctor deleted')
	}
}

/**
 * This functions deletes a file from the server storage using NodeJS `rmSync` function.
 * @param {String} filePath File that will be deleted.
 */
function deleteFile(filePath) {
	console.log(`Deleted - ${filePath}`)

	fs.rmSync(filePath)
}

module.exports = DoctorController
