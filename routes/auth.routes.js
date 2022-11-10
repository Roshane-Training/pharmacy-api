const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth.controller')
const { auth } = require('../middlewares/auth')

router.route('/login').post(AuthController.login)

/**
 * @openapi
 * /api/v1/auth/:
 *  post:
 *      summary: This Authenticates a user
 *      tags:
 *          - Auth
 *      requestBody:
 *          description: Data from the Login Form
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: geovauniegolding@mail.com
 *                          password:
 *                              type: string
 *                              example: 1234$%1234
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
 *                                  example: 200
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      user:
 *                                          type: object
 *                                          $ref: '#/components/schemas/User'
 *                                      token:
 *                                          type: string
 *                                          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjMyMjRjNWVjMDYyNzM2ZjQ4Njg2YTMwIiwiaWF0IjoxNjYzNzI5NTAzLCJleHAiOjE2NjM3MzEzMDN9.cWc0bEDMz-lWaP9bVgv9plPZ2sfh-8iY6HiyBWAbIGA
 *          404: 
 *              description: FAILED
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: 404
 *                              error:
 *                                  type: string
 *                                  example: Error finding auth user
 * 
 *          5XX:
 *              decription: FAILED
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: FAILED
 *                              error:
 *                                  type: string
 *                                  example: Server Error
 *               
 */
router.route('/user').post(auth, AuthController.getAuthUser)

module.exports = router
