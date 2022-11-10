const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth')
const Upload = require('../middlewares/multer')

router
	.route('/')

	/**
	 * @openapi
	 * /api/v1/users:
	 *  get:
	 *       tags:
	 *           - Users
	 *       responses:
	 *           200:
	 *               description: SUCCESS
	 *               content:
	 *                   application/json:
	 *                       schema:
	 *                           type: object
	 *                           properties:
	 *                               status:
	 *                                   type: string
	 *                                   example: Users found
	 */
	.get(auth, UserController.getAll)

	/**
	 * @openapi
	 * /api/v1/users:
	 *  post:
	 *      summary: Create a new User Profile
	 *      tags:
	 *          - Users
	 *      requestBody:
	 *          description: Form data required to create a new user
	 *          required: true
	 *          content:
	 *              application/json:
	 *                  schemas:
	 *                      User:
	 *                          type: object
	 *                          properties:
	 *                              id:
	 *                                  type: mongoose object id as string
	 *                                  example: 63228ae60e8b432603389f39
	 *                              fullName:
	 *                                  type: string
	 *                                  example: Geovaunie Golding
	 *                              phoneNumber:
	 *                                  type: string
	 *                                  example: 1234567890
	 *                              email:
	 *                                  type: string
	 *                                  example: geovauniegolding@mail.com
	 *                              password:
	 *                                  type: string
	 *                                  example: 1234$%1234
	 *                              role:
	 *                                  type: string
	 *                                  example: customer
	 * 
	 *      responses:
	 *          200:
	 *              description: SUCCESS
	 *              content:
	 *                  application/json:
	 *                      schema:
	 *                          type: object
	 *                          properties:
	 *                              status:
	 *                                  type: string
	 *                                  example: User created
	 *                              data:
	 *                                  type: object
	 *                                  properties:
	 *                                      user:
	 *                                          type: object
	 *                                          properties:
     *                                              id:
     *                                                   type: mongoose object id as string
     *                                                   example: 63228ae60e8b432603389f39
     *                                              fullName:
     *                                                   type: string
     *                                                   example: Geovaunie Golding
     *                                              phoneNumber:
     *                                                   type: string
     *                                                   example: 1234567890
     *                                              email:
     *                                                   type: string
     *                                                   example: geovauniegolding@mail.com
     *                                              password:
     *                                                   type: string
     *                                                   example: 1234$%1234
     *                                              role:
     *                                                   type: string
     *                                                   example: customer
	 * 
	 *          400:
	 *              description: FAILED
	 *              content:
	 *                  application/json:
	 *                      schema:
	 *                          type: object
	 *                          properties:
	 *                              status:
	 *                                  type: string
	 *                                  example: 400
	 *                              message:
	 *                                  type: string
	 *                                  example: Bad Request
	 *                              error:
	 *                                  type: string
	 *                                  example: Error creating user
	 * 
	 *          5XX:
	 *              description: FAILED
	 *              content:
	 *                  application/json:
	 *                      schema:
	 *                          type: object
	 *                          properties:
	 *                              status:
	 *                                  type: string
	 *                                  example: FAILED
	 *                              data:
	 *                                  type: object
	 *                                  properties:
	 *                                          error:
	 *                                              type: string
	 *                                              example: Server Error
	 */
	.post(Upload.single('image'), UserController.createOne)

router
	.route('/:id')

	/**
	 * @openapi
	 * /api/v1/users/{id}:
	 *  get:
	 *      summary: Retrieving a User Profile
	 *      tags:
	 *          - Users
	 *      requestBody:
	 *          description: Form data that gives access to a user profile
	 *          required: true
	 *          content:
	 *                application/json:
	 *                  schema:
	 *                      $ref: "#/components/schemas/User"
	 *      responses:
	 *          200:
	 *              description: SUCCESS
	 *              content:
	 *                  application/json:
	 *                         schema:
	 *                            type: object
	 *                            properties:
	 *                                status:
	 *                                   type: string
	 *                                   example: User found 
	 *                                data:
	 *                                   type: object
	 *                                   properties:
	 *                                         user:
	 *                                              type: object
	 *                                              $ref: "#/components/schemas/User" 
	 */
	.get(UserController.getOne)
	.patch(auth, UserController.updateOne)
	.delete(auth, UserController.deleteOne)

module.exports = router
