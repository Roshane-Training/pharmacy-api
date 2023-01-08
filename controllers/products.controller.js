const { SuccessResponse, ErrorResponse, S3Helper } = require('../lib/helpers')
const Product = require('../models/products')

class ProductController {
	/**
	 * Create One Product Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		// if (!req.file) return ErrorResponse(res, 'please select an image', 400)

		const maximum_file_szie = 563_200 // 550 Kilobytes (KB)
		const fileType = req.file.mimetype

		let createdProduct
		const { name, description, price, rating, categoryId } = req.body

		try {
			//file type validation
			if (fileType.startsWith('image/') === false) {
				return ErrorResponse(res, null, 'invalid upload file type')
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

			createdProduct = await Product.create({
				name,
				image: {
					data: Buffer.from(req.file.buffer),
					contentType: req.file.mimetype,
				},
				description,
				price,
				rating,
				categoryId,
			})
		} catch (error) {
			let errorMessage = 'error creating product'
			let statusCode = 500
			const fields = Object.keys(error.keyValue)

			if (error.code === 11000) {
				errorMessage = `${fields.join(', ')} is a duplicate`
				statusCode = 400
				// clear null so developer details are hidden
				error = null
			}
			return ErrorResponse(res, errorMessage, error, statusCode)
		}

		const _created = createdProduct.toObject()
		delete _created.image
		return SuccessResponse(res, 'product created', _created, 201)
	}

	/**
	 * Get All Product Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		let products
		try {
			products = await Product.find().select('-image')
		} catch (error) {
			console.log(error)
			return ErrorResponse(res, 'error finding products', error, 500)
		}

		if (!products)
			return SuccessResponse(res, 'there are no products at this time', products)

		return SuccessResponse(res, 'products found', products)
	}

	/**
	 * Get One Product Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		let product

		try {
			product = await Product.findById(req.params.id).select('-image')
		} catch (error) {
			console.log(error)
			return ErrorResponse(res, 'error finding the product with the model', error, 500)
		}

		if (!product) {
			return ErrorResponse(res, 'product not found', null, 404)
		}

		return SuccessResponse(res, 'product found', product)
	}

	/**
	 * Update One Product Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { name, image, description, price, rating, categoryId } = req.body
		const { id: _id } = req.params

		if (!name && !image && !price && !categoryId)
			return ErrorResponse(res, 'no data sent for an update', null, 200)

		const product = await Product.findOne({ _id }).catch((error) => {
			return ErrorResponse(res, 'error while trying to find product', error, 500)
		})

		if (!product) return ErrorResponse(res, 'no product found')

		const updatedProduct = await Product.updateOne(
			{ _id },
			{ name, image, description, price, rating, categoryId },
			{ returnDocument: true, returnOriginal: true, new: true }
		).catch((error) => {
			return ErrorResponse(res, 'error updating product', error, 500)
		})

		SuccessResponse(res, 'product updated', updatedProduct)
	}

	/**
	 * Delete One Product Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		let product

		try {
			product = await Product.findByIdAndDelete(req.params.id, { new: true }).select(
				'-image'
			)
		} catch (error) {
			return ErrorResponse(res, 'error deleting product', error, 500)
		}

		if (!product) return ErrorResponse(res, 'product not found', null, 404)

		return SuccessResponse(res, 'product deleted', product.name)
	}
}

module.exports = ProductController
