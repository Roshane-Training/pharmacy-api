const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')
const Upload = require('../middlewares/multer')

router
	.route('/')
	.get(UserController.getAll)
	.post(Upload.single('image'), UserController.createOne)

router
	.route('/:id')
	.get(UserController.getOne)
	.patch(UserController.updateOne)
	.delete(UserController.deleteOne)

module.exports = router
