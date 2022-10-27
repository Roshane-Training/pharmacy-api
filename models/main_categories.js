const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MainCategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },

    { timestamps: true, collection: 'main_categories' }
)

module.exports = mongoose.model('main_categories', MainCategorySchema)