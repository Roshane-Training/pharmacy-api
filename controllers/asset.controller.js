const { ErrorResponse, SuccessResponse } = require('../lib/helpers')
const S3Helper = require('../lib/s3Helper')

class AssetController {
	/**
	 * Fetch & display image from AWS S3 using S3 ID
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 * @param {import('express').NextFunction} next
	 */
	static async getImage(req, res, next) {
		const { s3ID } = req.params

		let file = await S3Helper.download(s3ID).catch((err) => {
			console.error(err)
			return ErrorResponse(res, 'Failed to get asset from our cloud storage')
		})

		if (file) {
			const base64Image = Buffer.from(file.Body).toString('base64')
			const defaultMimeType = `image/jpg`

			res.send(`<img src="data:${defaultMimeType};base64,${base64Image}" />`)
		} else {
			return ErrorResponse(res, 'This file was not found', null, 404)
		}
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
