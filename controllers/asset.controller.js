const { ErrorResponse, SuccessResponse } = require('../lib/helpers')
const fs = require('fs')
const path = require('path')

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

		if (document == null) {
			const imageBuffer = fs.readFileSync(
				path.resolve(path.dirname(__dirname) + '/resources/no_image.png')
			)
			res.set('content-type', 'image/png')
			return res.send(imageBuffer)
		}

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
			const { id } = req.params
			let resp = {}

			if (resp) return SuccessResponse(req, res, 'file deleted')
			else ErrorResponse(req, res, 'error while deleting file', resp)
		} else {
			return ErrorResponse(req, res, 'unauthorized', null, 401)
		}
	}
}

module.exports = AssetController
