const express = require('express')
const router = express.Router()
const MainCategoriesController = require('../controllers/main_categories.controller')

router
    .route('/')
    .get(MainCategoriesController.getAll)
    .post(MainCategoriesController.createOne)

router
    .route('/:id')
    .get(MainCategoriesController.getOne)
    .patch(MainCategoriesController.updateOne)
    .delete(MainCategoriesController.deleteOne)

module.exports = router