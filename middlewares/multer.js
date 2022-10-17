require('dotenv/config')
const multer = require('multer')
const path = require('path')
const isDevelopment = process.env.NODE_ENV == 'development'

const storage = multer.diskStorage({
	destination: 'public/images',
	filename: (req, file, cb) => {
		const uploadName =
			Date.now() + '_' + path.basename(file.originalname.replaceAll(' ', '_'))

		if (isDevelopment) {
			console.log(`Uploaded file - ${uploadName}`)
		}

		cb(null, uploadName)
	},
})

module.exports = multer({ storage })
