const { SuccessResponse, ErrorResponse, formatBytes } = require('../lib/helpers')
const Category = require('../models/categories')

class CategoryController {
	/**
	 * Create One Category Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		if (!req.file) return ErrorResponse(req, res, 'please select an image', 400)

		const maximum_file_szie = 563_200 // 550 Kilobytes (KB)
		const fileType = req.file.mimetype

		const { name } = req.body

		let createdCategory
		try {
			// file type validation
			if (fileType.startsWith('image/') === false) {
				return ErrorResponse(req, res, null, 'invalid upload file type')
			}

			// Check if the file size is larger than maximum
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

			createdCategory = await Category.create({
				name,
				image: {
					data: Buffer.from(req.file.buffer),
					contentType: req.file.mimetype,
				},
			})
		} catch (error) {
			console.log(error)
			return ErrorResponse(req, res, 'error creating category', error, 500)
		}
		const _created = createdCategory.toObject()
		delete _created.image
		return SuccessResponse(req, res, 'category created', _created, 201)
	}

	/**
	 * Get All Category Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		let categories
		try {
			categories = await Category.find({}).select('-image')
		} catch (error) {
			return ErrorResponse(req, res, 'error finding categories', error, 500)
		}

		if (!categories || categories.lenght <= 0)
			return SuccessResponse(
				req,
				res,
				'there are no categories at the moment',
				categories
			)

		return SuccessResponse(req, res, 'categories found', categories)
	}

	/**
	 * Get One Category Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		let category
		try {
			category = await Category.findById(req.params.id).select('-image')
		} catch (error) {
			return ErrorResponse(
				req,
				res,
				'error finding the category with model',
				error,
				500
			)
		}

		if (!category) return SuccessResponse(req, res, 'category not found', category)

		return SuccessResponse(req, res, 'category found', category)
	}

	/**
	 * Update One Category Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { name } = req.body
		const { id: _id } = req.params

		if (!name) return ErrorResponse(req, res, 'no data sent for an update', null, 200)

		let category
		try {
			category = await Category.findOne({ _id }).select('-image')
		} catch (error) {
			return ErrorResponse(req, res, 'error while trying to find category', error, 500)
		}

		if (!category) return ErrorResponse(req, res, 'no category found')

		const updatedCategory = await Category.updateOne(
			{ _id },
			{ name },
			{ new: true }
		).catch((error) => {
			return ErrorResponse(req, res, 'error updating category', error, 500)
		})

		SuccessResponse(req, res, 'category updated', updatedCategory)
	}

	/**
	 * Delete One Category Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		let category
		try {
			category = await Category.findByIdAndRemove(req.params.id, {
				returnDocument: true,
			})
		} catch (error) {
			return ErrorResponse(req, res, 'error deleting category', error, 500)
		}

		if (!category)
			return ErrorResponse(req, res, 'category not found for removal', null, 200)

		return SuccessResponse(req, res, 'category deleted', category.name)
	}
}

module.exports = CategoryController
