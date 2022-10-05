const express = require('express')
const router = express.Router()
const IndexController = require('../controllers/index.controller')

router.route('/').get(IndexController.welcome).post(IndexController.fun)

module.exports = router
