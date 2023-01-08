const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			data: Buffer,
			contentType: String,
		},
	},

	{ timestamps: true, collection: 'categories' }
)

module.exports = mongoose.model('categories', CategorySchema)
