const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const Category = require('../models/categories')

class CategoryController {
	/**
	 * Create One Category Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		const createdCategory = await Category.create(req.body).catch((error) => {
			ErrorResponse(res, 'error creating  category', error, 500)
		})

		SuccessResponse(res, 'category created', createdCategory, 201)
	}

	/**
	 * Get All Category Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		const categories = await Category.find().catch((error) => {
			return ErrorResponse(res, 'error finding categories', error, 500)
		})

		if (!categories || categories.lenght <= 0)
			return SuccessResponse(res, 'there are no categories at the moment', categories)

		return SuccessResponse(res, 'categories found', categories)
	}

	/**
	 * Get One Category Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		const category = await Category.findById(req.params.id).catch((error) => {
			return ErrorResponse(res, 'error finding the category with model', error, 500)
		})

		if (!category) return SuccessResponse(res, 'category not found', category)

		return SuccessResponse(res, 'category found', category)
	}

	/**
	 * Update One Category Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { name } = req.body
		const { id: _id } = req.params

		if (!name) return ErrorResponse(res, 'no data sent for an update', null, 200)

		const category = await Category.findOne({ _id }).catch((error) => {
			return ErrorResponse(res, 'error while trying to find category', error, 500)
		})

		if (!category) return ErrorResponse(res, 'no category found')

		const updatedCategory = await Category.updateOne(
			{ _id },
			{ name },
			{ returnDocument: true, returnOriginal: true, new: true }
		).catch((error) => {
			return ErrorResponse(res, 'error updating category', error, 500)
		})

		SuccessResponse(res, 'category updated', updatedCategory)
	}

	/**
	 * Delete One Category Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		let category = await Category.findByIdAndRemove(req.params.id, {
			returnDocument: true,
		}).catch((error) => {
			ErrorResponse(res, 'error deleting category', error, 500)
		})

		if (!category)
			return ErrorResponse(res, 'category not found for removal', null, 200)

		return SuccessResponse(res, 'category deleted', category.name)
	}
}

module.exports = CategoryController
