const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { parseImageUrl } = require('../lib/helpers')
const Schema = mongoose.Schema

const requiredString = { type: String, required: true }
const requiredNumber = { type: Number, required: true }

const DoctorSchema = Schema({
	fullName: { ...requiredString },
	title: { ...requiredString },
	image: {
		data: Buffer,
		contentType: String,
	},
	ratings: { type: Array, required: false },
	patients: { ...requiredNumber },
	experience: { type: Array, required: true },
	about: { ...requiredString },
	phoneNumber: {
		...requiredString,
		validate: {
			validator: (value) => /\d{3}-\d{3}-\d{4}/.test(value),
			message: (props) =>
				`${props.value} is not a valid phone number! Try using this pattern 000-000-0000`,
		},
	},
	email: {
		...requiredString,
		unique: [true, 'this email is currently being used'],
		validate: {
			validator: (value) =>
				/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
					value
				),
			message: (props) => `${props.value} is not a valid email address!`,
		},
	},
	password: { ...requiredString },
	role: {
		...requiredString,
		default: 'doctor',
	},
})

DoctorSchema.pre('save', async function (next) {
	if (this.password && this.isModified('password')) {
		const salt = await bcrypt.genSalt(10).catch((error) => console.log(error))

		const hashedPassword = await bcrypt
			.hash(this.password, salt)
			.catch((error) => console.log(error))

		this.password = hashedPassword

		next()
	} else {
		throw new Error('fatal error while running `doctors` pre save model middleware')
	}
})

// DoctorSchema.post('find', function (docs, next) {
// 	// Checks if the request is a query? (not too sure to be honest)
// 	if (this instanceof mongoose.Query) {
// 		for (let doc of docs) {
// 			parseImageUrl(doc, `${process.env.ASSET_URL}/images/${doc.image}`)
// 		}
// 	}

// 	// Pass on the request if the parse works or not
// 	next()
// })

// DoctorSchema.post('findOne', function (doc, next) {
// 	// Checks if the request is a query? (not too sure to be honest)
// 	if (this instanceof mongoose.Query) {
// 		parseImageUrl(doc, `${process.env.ASSET_URL}/images/${doc.image}`)
// 	}

// 	// Pass on the request if the parse works or not
// 	next()
// })

module.exports = mongoose.model('doctors', DoctorSchema)
