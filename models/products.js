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
			type: String,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: false,
		},
		main_categoryId: {
			type: Schema.Types.ObjectId,
			ref: 'MainCategory',
			required: false,
		},
		sub_categoryId: {
			type: Schema.Types.ObjectId,
			ref: 'SubCategory',
			required: false,
		},
	},
	{ timestamps: true, collection: 'Products' }
)

productSchema.post('find', function (docs, next) {
	// Checks if the request is a query? (not too sure to be honest)
	if (this instanceof mongoose.Query) {
		for (let doc of docs) {
			parseImageUrl(doc, `${process.env.ASSET_URL}/images/${doc.image}`)
		}
	}

	// Pass on the request if the parse works or not
	next()
})

productSchema.post('findOne', function (doc, next) {
	// Checks if the request is a query? (not too sure to be honest)
	if (this instanceof mongoose.Query) {
		parseImageUrl(doc, `${process.env.ASSET_URL}/images/${doc.image}`)
	}

	// Pass on the request if the parse works or not
	next()
})

module.exports = mongoose.model('Products', productSchema)
