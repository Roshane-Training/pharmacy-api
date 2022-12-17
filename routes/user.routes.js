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
	.post(Upload.single('image'), UserController.createOne)

router
	.route('/:id')

	/**
	 * @openapi
	 * /api/v1/users/{id}:
	 *  get:
	 *      summary: Retrieves a User Profile
	 *      tags:
	 *          - Users
	 *      requestBody:
	 *          description: Form data that selects and gives access to a user profile
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
	 *                                  example: 404
	 *                              message:
	 *                                  type: string
	 *                                  example: Bad Request
	 *                              error:
	 *                                  type: string
	 *                                  example: Error finding user with model
	 *
	 *          5XX:
	 *              description: FAILED
	 *              content:
	 *                  appliction/json:
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
	 *
	 */
	.get(UserController.getOne)

	/**
	 * @openapi
	 * /api/v1/users/{id}:
	 *  patch:
	 *        summary: Updates a User Profile
	 *        tags:
	 *            - Users
	 *        requestBody:
	 *            description: Form data required to update a user profile
	 *            required: true
	 *            content:
	 *                  application/json:
	 *                    schema:
	 *                        $ref: "#/components/schemas/User"
	 *        responses:
	 *            200:
	 *                description: SUCCESS
	 *                content:
	 *                    application/json:
	 *                           schema:
	 *                              type: object
	 *                              properties:
	 *                                  status:
	 *                                     type: string
	 *                                     example: User updated
	 *                                  data:
	 *                                     type: object
	 *                                     properties:
	 *                                           user:
	 *                                                type: object
	 *                                                $ref: "#/components/schemas/User"
	 *
	 *            400:
	 *                description: FAILED
	 *                content:
	 *                    application/json:
	 *                        schema:
	 *                            type: object
	 *                            properties:
	 *                                status:
	 *                                    type: string
	 *                                    example: 404
	 *                                message:
	 *                                    type: string
	 *                                    example: Bad Request
	 *                                error:
	 *                                    type: string
	 *                                    example: Error updating user
	 *
	 *            5XX:
	 *                decription: FAILED
	 *                content:
	 *                    application/json:
	 *                        schema:
	 *                            type: object
	 *                            properties:
	 *                                status:
	 *                                    type: string
	 *                                    example: FAILED
	 *                                data:
	 *                                    type: object
	 *                                    properties:
	 *                                            error:
	 *                                                type: string
	 *                                                example: Server Error
	 *
	 */
	.patch(auth, UserController.updateOne)

	/**
	 * @openapi
	 * /api/v1/users/{id}:
	 *  delete:
	 *         summary: Deletes a User Profile
	 *         tags:
	 *             - Users
	 *         requestBody:
	 *             description: Form data that is required to select a user profile for deletion
	 *             required: true
	 *             content:
	 *                   application/json:
	 *                     schema:
	 *                         $ref: "#/components/schemas/User"
	 *         responses:
	 *             200:
	 *                 description: SUCCESS
	 *                 content:
	 *                     application/json:
	 *                            schema:
	 *                               type: object
	 *                               properties:
	 *                                   status:
	 *                                       type: string
	 *                                       example: User deleted
	 *                                   data:
	 *                                       type: object
	 *                                       properties:
	 *                                             user:
	 *                                                  type: object
	 *                                                  $ref: "#/components/schemas/User"
	 *
	 *             400:
	 *                 description: FAILED
	 *                 content:
	 *                     application/json:
	 *                         schema:
	 *                             type: object
	 *                             properties:
	 *                                 status:
	 *                                     type: string
	 *                                     example: 404
	 *                                 message:
	 *                                     type: string
	 *                                     example: Bad Request
	 *                                 error:
	 *                                     type: string
	 *                                     example: Error deleting with user model
	 *
	 *             5XX:
	 *                 descripton: FAILED
	 *                 content:
	 *                     application/json:
	 *                         schema:
	 *                             type: object
	 *                             properties:
	 *                                 status:
	 *                                     type: string
	 *                                     example: FAILED
	 *                                 data:
	 *                                     type: object
	 *                                     properties:
	 *                                             error:
	 *                                                 type: string
	 *                                                 example: Server Error
	 *
	 */
	.delete(auth, UserController.deleteOne)

module.exports = router
