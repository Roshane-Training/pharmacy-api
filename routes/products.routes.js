const express = require('express')
const router = express.Router()
const ProductsController = require('../controllers/products.controller')


router
    .route('/')
    .get(ProductsController.getAll)
    .post(ProductsController.createOne)

router
    .route('/:id')
    .get(ProductsController.getOne)
    .patch(ProductsController.updateOne)
    .delete(ProductsController.deleteOne)

module.exports = router;