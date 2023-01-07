const { ErrorResponse, SuccessResponse } = require('../lib/helpers')
const S3Helper = require('../lib/s3Helper')
const Product = require('../models/products')

class AssetController {
	/**
	 * Fetch & display image from AWS S3 using S3 ID
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {import('express').NextFunction} next
	 * @param {import('mongoose').Model} model
	 */
	static async getImage(req, res, next, model) {
		const { id } = req.params
		let document

		try {
			document = await model.findOne({ _id: id })
		} catch (error) {
			console.log('Model Find Error', error)
		}

		if (document == null) return ErrorResponse(req, res, 'image not found', null, 404)

		res.set('content-type', document.image.contentType)
		return res.send(document.image.data)
	}

	/**
	 * Deletes image from AWS S3 using S3 ID
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {import('express').NextFunction} next
	 */
	static async deleteImage(req, res, next) {
		const authRole = req?.['user']['role']

		if (authRole == UserType.admin) {
			const { s3ID } = req.params
			const resp = await S3Helper.delete(s3ID).catch((err) => console.error(err))

			if (resp) return SuccessResponse(res, 'file deleted')
			else ErrorResponse(res, 'error while deleting file', resp)
		} else {
			return ErrorResponse(res, 'unauthorized', null, 401)
		}
	}
}

module.exports = AssetController
