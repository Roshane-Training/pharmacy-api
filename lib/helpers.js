require('dotenv/config')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const S3Helper = require('./s3Helper')

/**
 *
 * @param {Response} res Express app response parameter
 * @param {Array} data Data to return as json to the endpoint
 * @param {String} message Message to return as json to the endpoint. Default: "success"
 * @param {Number} status HTTP Status Code to return to endpoint. Default: 200
 */
function SuccessResponse(res, message = 'success', data = [], status = 200) {
	res.status(status).json({ success: true, data, message, status })
}

/**
 *
 * @param {Response} res Express app response parameter
 * @param {Array} data Data to return as json to the endpoint
 * @param {String} message Message to return as json to the endpoint. Default: "error"
 * @param {Number} status HTTP Status Code to return to endpoint. Default: 500
 */
function ErrorResponse(res, message = 'error', data = [], status = 500) {
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
	document.image = `${imagePath}/${document.image}`
}

module.exports = {
	SuccessResponse,
	ErrorResponse,
	DevLog,
	generateAccessToken,
	parseImageUrl,
}
