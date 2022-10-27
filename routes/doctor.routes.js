const express = require('express')
const router = express.Router()
const DoctorController = require('../controllers/doctor.controller')
const { auth } = require('../middlewares/auth')
const Upload = require('../middlewares/multer')

router
	.route('/')
	.get(auth, DoctorController.getAll)
	.post(Upload.single('image'), DoctorController.createOne)

router
	.route('/:id')
	.get(DoctorController.getOne)
	.patch(auth, DoctorController.updateOne)
	.delete(auth, DoctorController.deleteOne)

module.exports = router
