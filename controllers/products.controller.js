const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const Product = require('../models/products')
const path = require('path')
const fs = require('fs')
const { deleteFile } = require('../lib/helpers')

class ProductController {

    /**
     * Create One Product Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static createOne = async (req, res) => {
        console.log(req.file)
        const uploadedImagePath = path.resolve(req.file.path)
        const uploadedImage = path
            .join(path.dirname(req.file.path), path.basename(req.file.path))
            .replace('public', '')
            .replaceAll('\\', '/') // image/CURRENT_TIME_original_file_name.jpg

        const fileType = req.file.mimetype

        let createdProduct
        const {
            name,
            image,
            description,
            price,
            rating,
            main_categoryId,
            sub_categoryId,
        } = req.body

        try {
            //file type validation
            if (fileType.startsWith('image/') === false) {
                deleteFile(uploadedImagePath)
                return ErrorResponse(res, null, 'invalid upload file type')
            }

            createdProduct = await Product.create({
                name, 
                image: uploadedImage,
                description,
                price,
                rating,
                main_categoryId,
                sub_categoryId,
            })
        } catch (error) {
            // delete uploaded image by multer if there's an error in creation
            deleteFile(uploadedImagePath)

            ErrorResponse(res, 'error creating product', error, 500)
        }

        SuccessResponse(res, 'product created', createdProduct, 201)
    }


    /**
     * Get All Product Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static getAll = async (req, res) => {
        const products = await Product.find().catch((error) => {
            return ErrorResponse(res, 'error finding products', error, 500)
        })

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

        if (!product) return SuccessResponse(res, 'product not found', product)

        return SuccessResponse(res, 'category found', product)
     }


    /**
     * Update One Product Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static updateOne = async (req, res) => {
        const { name, image, description, price, rating, main_categoryId, sub_categoryId } = req.body
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