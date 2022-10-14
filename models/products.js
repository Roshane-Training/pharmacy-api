const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true

    }
});


module.exports = mongoose.model('Products', productSchema);