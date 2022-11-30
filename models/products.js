const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
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

module.exports = mongoose.model('Products', productSchema)
