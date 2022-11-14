const express = require('express')
const AuthController = require('../controllers/auth.controller')
const router = express.Router()
const DoctorController = require('../controllers/doctor.controller')
const { auth } = require('../middlewares/auth')
const Upload = require('../middlewares/multer')

router
	.route('/')

	/**
	 * @openapi
	 * /api/v1/doctors:
	 *  get:
	 *       tags:
	 *           - Doctors
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
	 *                                   example: Doctors found
	 */
	.get(auth, DoctorController.getAll)

	/**
	 * @openapi
	 * /api/v1/doctors:
	 *  post:
	 *      summary: Create a New Doctor Profile
	 *      tags:
	 *          - Doctors
	 *      requestBody:
	 *          description: Form data required to create a new doctor
	 *          required: true
	 *          content:
	 *              application/json:
	 *                  schema:
	 *                      $ref: "#/components/schemas/Doctor"
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
	 *                                  example: Doctor created
	 *                              data:
	 *                                  type: object
	 *                                  properties:
	 *                                      doctor:
	 *                                           type: object
	 *                                           $ref: "#/components/schemas/Doctor"
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
	 *                                  example: Error creating doctor
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
	.post(Upload.single('image'), DoctorController.createOne)

router
	.route('/login')
	.post(AuthController.loginDoctor)

router
	.route('/:id')

	/**
	 * @openapi
	 * /api/v1/doctors/{id}:
	 *  get:
	 *      summary: Retrieves a Doctor Profile
	 *      tags:
	 *          - Doctors
	 *      requestBody:
	 *          description: Form data that selects and gives access to a doctor profile
	 *          required: true
	 *          content:
	 *                application/json:
	 *                  schema:
	 *                      $ref: "#/components/schemas/Doctor"
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
	 *                                   example: Doctor found 
	 *                                data:
	 *                                   type: object
	 *                                   properties:
	 *                                         doctor:
	 *                                              type: object
	 *                                              $ref: "#/components/schemas/Doctor" 
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
	 *                                  example: Error finding doctor with model
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
	.get(DoctorController.getOne)

	/**
	 * @openapi
	 * /api/v1/doctors/{id}:
	 *  patch:
	 *        summary: Updates a Doctor Profile
	 *        tags:
	 *            - Doctors
	 *        requestBody:
	 *            description: Form data required to update a doctor profile
	 *            required: true
	 *            content:
	 *                  application/json:
	 *                    schema:
	 *                        $ref: "#/components/schemas/Doctor"
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
	 *                                     example: Doctor updated
	 *                                  data: 
	 *                                     type: object
	 *                                     properties:
	 *                                           doctor:
	 *                                                type: object
	 *                                                $ref: "#/components/schemas/Doctor"
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
	 *                                    example: Error updating doctor
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
	.patch(auth, DoctorController.updateOne)

	/**
	 * @openapi
	 * /api/v1/doctors/{id}:
	 *  delete:
	 *         summary: Deletes a Doctor Profile
	 *         tags:
	 *             - Doctors
	 *         requestBody:
	 *             description: Form data that is required to select a doctor profile for deletion
	 *             required: true
	 *             content:
	 *                   application/json:
	 *                     schema:
	 *                         $ref: "#/components/schemas/Doctor"
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
	 *                                       example: Doctor deleted
	 *                                   data:
	 *                                       type: object
	 *                                       properties: 
	 *                                             doctor:
	 *                                                  type: object
	 *                                                  $ref: "#/components/schemas/Doctor"
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
	 *                                     example: Error deleting with doctor model
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
	.delete(auth, DoctorController.deleteOne)

module.exports = router
