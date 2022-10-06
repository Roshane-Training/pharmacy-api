const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')

router.route('/').get(UserController.getAll).post(UserController.createOne)

router
	.route('/:id')
	.get(UserController.getOne)
	.patch(UserController.updateOne)
	.delete(UserController.deleteOne)

module.exports = router
