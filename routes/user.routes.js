const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth')
const Upload = require('../middlewares/multer')

router
	.route('/')
	.get(auth, UserController.getAll)
	.post(Upload.single('image'), UserController.createOne)

router
	.route('/:id')
	.get(UserController.getOne)
	.patch(auth, UserController.updateOne)
	.delete(auth, UserController.deleteOne)

module.exports = router
