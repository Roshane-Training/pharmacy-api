const express = require('express')
const router = express.Router()
const ProductsController = require('../controllers/products.controller')
const multer = require('multer')

//Getting Image
//storage
const Storage = multer.diskStorage({
    destination: 'upload',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: Storage,
}).single('image')

router
    .route('/')
    .get(ProductsController.getAll)
    .post(upload, ProductsController.createOne)

router
    .route('/:id')
    .get(ProductsController.getOne)
    .patch(ProductsController.updateOne)
    .delete(ProductsController.deleteOne)

module.exports = router;