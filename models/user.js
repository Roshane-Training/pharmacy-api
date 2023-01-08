require('dotenv/config')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { parseImageUrl } = require('../lib/helpers')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	fullName: { type: String, required: true },
	image: {
		required: false,
		data: Buffer,
		contentType: String,
	},
	phoneNumber: {
		type: String,
		required: false,
		validate: {
			validator: (value) => /\d{3}-\d{3}-\d{4}/.test(value),
			message: (props) =>
				`${props.value} is not a valid phone number! Try using this pattern 000-000-0000`,
		},
	},
	email: {
		type: String,
		required: true,
		unique: [true, 'this email is currently being used'],
		validate: {
			validator: (value) =>
				/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
					value
				),
			message: (props) => `${props.value} is not a valid email address!`,
		},
	},
	password: { type: String, required: true },
	role: {
		type: String,
		required: true,
		default: 'customer',
	},
})

UserSchema.pre('save', async function (next) {
	if (this.password && this.isModified('password')) {
		const salt = await bcrypt.genSalt(10).catch((error) => console.log(error))

		const hashedPassword = await bcrypt
			.hash(this.password, salt)
			.catch((error) => console.log(error))

		this.password = hashedPassword

		next()
	} else {
		throw new Error('fatal error while running `users` pre save model middleware')
	}
})

UserSchema.post('find', function (docs, next) {
	// Checks if the request is a query? (not too sure to be honest)
	if (this instanceof mongoose.Query) {
		for (let doc of docs) {
			delete doc.image
			parseImageUrl(doc, `${process.env.ASSET_URL}/users/image`)
		}
	}

	// Pass on the request if the parse works or not
	next()
})

UserSchema.post('findOne', function (doc, next) {
	// Checks if the request is a query? (not too sure to be honest)
	if (this instanceof mongoose.Query) {
		delete doc.image
		parseImageUrl(doc, `${process.env.ASSET_URL}/users/image`)
	}

	// Pass on the request if the parse works or not
	next()
})

module.exports = mongoose.model('users', UserSchema)
