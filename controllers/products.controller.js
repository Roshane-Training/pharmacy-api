const { SuccessResponse, ErrorResponse, S3Helper } = require('../lib/helpers')
const Product = require('../models/products')

class ProductController {
	/**
	 * Create One Product Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		if (!req.file) return ErrorResponse(res, 'please select an image', 400)

		const uploadedImageKey = await S3Helper.upload(req.file, Date.now().toString())

		const fileType = req.file.mimetype

		let createdProduct
		const { name, description, price, rating, main_categoryId, sub_categoryId } =
			req.body

		try {
			//file type validation
			if (fileType.startsWith('image/') === false) {
				S3Helper.delete(uploadedImageKey)
				return ErrorResponse(res, null, 'invalid upload file type')
			}

			createdProduct = await Product.create({
				name,
				image: uploadedImageKey.key,
				description,
				price,
				rating,
				main_categoryId,
				sub_categoryId,
			})
		} catch (error) {
			// delete uploaded image by multer if there's an error in creation
			S3Helper.delete(uploadedImageKey)

			return ErrorResponse(res, 'error creating product', error, 500)
		}

		return SuccessResponse(res, 'product created', createdProduct, 201)
	}

	/**
	 * Get All Product Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		let products
		try {
			products = await Product.find()
		} catch (error) {
			console.log(error)
			return ErrorResponse(res, 'error finding products', error, 500)
		}

		if (!products || products.lenght <= 0)
			return SuccessResponse(res, 'there are no products at this time', products)

		return SuccessResponse(res, 'products found', products)
	}

	/**
	 * Get One Product Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		const product = await Product.findById(req.params.id).catch((error) => {
			return ErrorResponse(res, 'error finding the product with the model', error, 500)
		})

		if (!product) {
			return SuccessResponse(res, 'product not found', product)
		} else {
			return SuccessResponse(res, 'product found', product)
		}
	}

	/**
	 * Update One Product Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { name, image, description, price, rating, main_categoryId, sub_categoryId } =
			req.body
		const { id: _id } = req.params

		if (!name && !image && !price && !category)
			return ErrorResponse(res, 'no data sent for an update', null, 200)

		const product = await Product.findOne({ _id }).catch((error) => {
			return ErrorResponse(res, 'error while trying to find product', error, 500)
		})

		if (!product) return ErrorResponse(res, 'no product found')

		const updatedProduct = await Product.updateOne(
			{ _id },
			{ name, image, description, price, rating, main_categoryId, sub_categoryId },
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
		let product = await Product.findByIdAndRemove(req.params.id, {
			returnDocument: true,
		}).catch((error) => {
			ErrorResponse(res, 'error deleting product', error, 500)
		})

		if (!product) return ErrorResponse(res, 'product not found for deletion', null, 200)

		return SuccessResponse(res, 'product deleted', product.name)
	}
}

module.exports = ProductController
