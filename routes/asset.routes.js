const express = require('express')
const router = express.Router()
const AssetController = require('../controllers/asset.controller.js')
const { auth } = require('../middlewares/auth.js')

router
	.route('/images/:id')
	.get(AssetController.getImage)
	.delete(auth, AssetController.deleteImage)

module.exports = router
