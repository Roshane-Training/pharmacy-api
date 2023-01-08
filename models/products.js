require('dotenv/config')
const mongoose = require('mongoose')
const { parseImageUrl } = require('../lib/helpers')

const Schema = mongoose.Schema
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			data: Buffer,
			contentType: String,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		rating: {
			type: Number,
			required: false,
		},
		categoryId: {
			type: Schema.Types.ObjectId,
			ref: 'categories',
			required: false,
		},
	},
	{ timestamps: true, collection: 'Products' }
)

productSchema.post('find', function (doc, next) {
	// Checks if the request is a query? (not too sure to be honest)
	if (this instanceof mongoose.Query) {
		console.log(doc)
		// parseImageUrl(doc, `${process.env.ASSET_URL}/images/${doc.image}`)
	}

	// Pass on the request if the parse works or not
	next()
})

productSchema.post('findOne', function (doc, next) {
	// Checks if the request is a query? (not too sure to be honest)
	if (this instanceof mongoose.Query) {
		// parseImageUrl(doc, `${process.env.ASSET_URL}/images/${doc.image}`)
	}

	// Pass on the request if the parse works or not
	next()
})

module.exports = mongoose.model('Products', productSchema)
