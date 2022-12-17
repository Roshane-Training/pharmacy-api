require('dotenv/config')
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const { AWS_BUCKET_REGION, AWS_ACCESS_ID, AWS_ACCESS_KEY, AWS_BUCKET, AWS_ACL } =
	process.env

const s3 = new aws.S3({
	accessKeyId: AWS_ACCESS_ID,
	secretAccessKey: AWS_ACCESS_KEY,
})

// const isDevelopment = process.env.NODE_ENV == 'development'

// const storage = multer.diskStorage({
// 	destination: 'public/images',
// 	filename: (req, file, cb) => {
// 		const uploadName =
// 			Date.now() + '_' + path.basename(file.originalname.replaceAll(' ', '_'))

// 		if (isDevelopment) {
// 			console.log(`Uploaded file - ${uploadName}`)
// 		}

// 		cb(null, uploadName)
// 	},
// })

const uploadS3 = multer({
	storage: multerS3({
		s3: s3,
		bucket: AWS_BUCKET,
		acl: AWS_ACL,
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname })
		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString())
		},
	}),
})

module.exports = multer({ uploadS3 })
