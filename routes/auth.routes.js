const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth.controller')
const { auth } = require('../middlewares/auth')

router.route('/login').post(AuthController.login)
router.route('/user').post(auth, AuthController.getAuthUser)

module.exports = router
