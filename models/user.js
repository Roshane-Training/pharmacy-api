const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	image: { type: String, required: true },
	email: { type: String, required: true },
	phoneNumber: { type: Number, required: true },
	password: { type: String, required: true },
	role: { type: String, enum: ['customer', 'doctor', 'admin'], required: true },
})

module.exports = mongoose.model('users', UserSchema)
