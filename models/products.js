const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            data: Buffer,
            contentType: String
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        rating: {
            type: Array,
            required: false
        },
        main_categoryId: {
            type: Schema.Types.ObjectId, ref:"MainCategory",
            required: true,
        },
        sub_categoryId: {
            type: Schema.Types.ObjectId, ref:"SubCategory",
            required: true,
        }
    },

    { timestamps: true, collection: 'Products' }
);


module.exports = mongoose.model('Products', productSchema);