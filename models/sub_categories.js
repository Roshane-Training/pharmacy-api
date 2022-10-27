const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SubCategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        main_categoryId: {
            type: Schema.Types.ObjectId, ref:"MainCategory",
            required: true,
        }
    },

    { timestamps: true, collection: 'sub_categories' }
)

module.exports = mongoose.model('sub_categories', SubCategorySchema)