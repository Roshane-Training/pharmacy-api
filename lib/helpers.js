require('dotenv/config')

/**
 *
 * @param {Response} res Express app response parameter
 * @param {Array} data Data to return as json to the endpoint
 * @param {String} message Message to return as json to the endpoint. Default: "success"
 * @param {Number} status HTTP Status Code to return to endpoint. Default: 200
 * @returns
 */
function SuccessResponse(res, data = [], message = 'success', status = 200) {
	return res.status(status).json({ message, status, data })
}

/**
 *
 * @param {Response} res Express app response parameter
 * @param {Array} data Data to return as json to the endpoint
 * @param {String} message Message to return as json to the endpoint. Default: "error"
 * @param {Number} status HTTP Status Code to return to endpoint. Default: 500
 * @returns
 */
function ErrorResponse(res, data = [], message = 'error', status = 500) {
	return res.status(status).json({ message, status, data })
}

/**
 * Logs information if the application is in development mode
 * @param {any} message Information to output
 */
function DevLog(message = '') {
	const isProduction = process.env.PRODUCTION || false

	if (isProduction === false) {
		console.log(message)
	}
}

module.exports = { SuccessResponse, ErrorResponse, DevLog }
