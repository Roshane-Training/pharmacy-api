const express = require('express')
const router = express.Router()
const SubCategoriesController = require('../controllers/sub_categories.controller')

router
    .route('/')
    .get(SubCategoriesController.getAll)
    .post(SubCategoriesController.createOne)

router
    .route('/:id')
    .get(SubCategoriesController.getOne)
    .patch(SubCategoriesController.updateOne)
    .delete(SubCategoriesController.deleteOne)

module.exports = router