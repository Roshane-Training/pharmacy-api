require('dotenv/config')
const jwt = require('jsonwebtoken')

/**
 * @param {import("express").Request} req Express app request parameter
 * @param {import("express").Response} res Express app response parameter
 * @param {Array} data Data to return as json to the endpoint
 * @param {String} message Message to return as json to the endpoint. Default: "success"
 * @param {Number} status HTTP Status Code to return to endpoint. Default: 200
 */
function SuccessResponse(req, res, message = 'success', data = [], status = 200) {
	res.status(status).json({ success: true, message, status, data })
}

/**
 * @param {import("express").Request} req Express app request parameter
 * @param {import("express").Response} res Express app response parameter
 * @param {Array} data Data to return as json to the endpoint
 * @param {String} message Message to return as json to the endpoint. Default: "error"
 * @param {Number} status HTTP Status Code to return to endpoint. Default: 500
 */
function ErrorResponse(req, res, message = 'error', data = [], status = 500) {
	res.status(status).json({ success: false, message, status, data })
}

/**
 * Logs information if the application is in development mode
 * @param {any} message Information to output
 */
function DevLog(message = '') {
	const isDevelopment = process.env.NODE_ENV == 'development' || false
	if (isDevelopment) console.log(message)
}

/**
 * Generates a signed access token for
 * @param {String} id
 * @returns
 */
function generateAccessToken(id) {
	let signedToken

	try {
		signedToken = jwt.sign(id, process.env.SECRET_JWT_TOKEN, { expiresIn: '1d' })
	} catch (error) {
		console.log(error)
	}

	return signedToken
}

/**
 * Parse the AWS S3 image url for easy access in response
 * @param {import('mongoose').Document} document
 * @param {String} imagePath
 */
function parseImageUrl(document, imagePath) {
	document.imageUrl = `${imagePath}/${document.id}`
}

/**
 * Formats a number of bytes into a more readable string, with optional decimal precision.
 *
 * @param {number} bytes - The number of bytes to format.
 * @param {number} [decimals=2] - The number of decimal places to include in the formatted string.
 *
 * @returns {string} - A formatted string representing the number of bytes, in the form '<value> <unit>'.
 *                    The unit will be one of ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
 *                    depending on the size of the number.
 *
 * @example
 * formatBytes(1024) // '1.00 KB'
 * formatBytes(1024 * 1024) // '1.00 MB'
 * formatBytes(1024 * 1024 * 1024) // '1.00 GB'
 * formatBytes(1024, 0) // '1 KB'
 * formatBytes(1024, 3) // '1.024 KB'
 */
function formatBytes(bytes, decimals = 2) {
	if (!+bytes) return '0 Bytes'

	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

module.exports = {
	SuccessResponse,
	ErrorResponse,
	DevLog,
	generateAccessToken,
	parseImageUrl,
	formatBytes,
}
