const express = require('express')
const AssetController = require('../controllers/asset.controller')
const router = express.Router()
const CategoriesController = require('../controllers/categories.controller')
const Upload = require('../middlewares/multer')
const Category = require('../models/categories')

router.route('/image/:id').get((req, res, next) => {
	return AssetController.getImage(req, res, next, Category)
})

router
	.route('/')

	/**
	 * @openapi
	 * /api/v1/maincategories:
	 *  get:
	 *       tags:
	 *           - MainCategories
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
	 *                                   example: Category found
	 *
	 */
	.get(CategoriesController.getAll)

	/**
	 * @openapi
	 * /api/v1/maincategories:
	 *  post:
	 *      summary: Create a New Category
	 *      tags:
	 *          - MainCategories
	 *      requestBody:
	 *          description: Form data required to create a new category
	 *          required: true
	 *          content:
	 *              application/json:
	 *                  schema:
	 *                      $ref: "#/components/schemas/Category"
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
	 *                                  example: Category created
	 *                              data:
	 *                                  type: object
	 *                                  properties:
	 *                                      category:
	 *                                           type: object
	 *                                           $ref: "#/components/schemas/Category"
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
	 *                                  example: Error creating category
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
	 *
	 */
	.post(Upload.single('image'), CategoriesController.createOne)

router
	.route('/:id')

	/**
	 * @openapi
	 * /api/v1/maincategories/{id}:
	 *  get:
	 *      summary: Retrieves a Category
	 *      tags:
	 *          - MainCategories
	 *      requestBody:
	 *          description: Form data that selects and gives access to a category
	 *          required: true
	 *          content:
	 *                application/json:
	 *                  schema:
	 *                      $ref: "#/components/schemas/Category"
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
	 *                                   example: Category found
	 *                                data:
	 *                                   type: object
	 *                                   properties:
	 *                                         category:
	 *                                              type: object
	 *                                              $ref: "#/components/schemas/Category"
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
	 *                                  example: Error finding category with model
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
	.get(CategoriesController.getOne)

	/**
	 * @openapi
	 * /api/v1/maincategories/{id}:
	 *  patch:
	 *        summary: Updates a Category
	 *        tags:
	 *            - MainCategories
	 *        requestBody:
	 *            description: Form data required to update a category
	 *            required: true
	 *            content:
	 *                  application/json:
	 *                    schema:
	 *                        $ref: "#/components/schemas/Category"
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
	 *                                     example: Category updated
	 *                                  data:
	 *                                     type: object
	 *                                     properties:
	 *                                           category:
	 *                                                type: object
	 *                                                $ref: "#/components/schemas/Category"
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
	 *                                    example: Error updating category
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
	.patch(CategoriesController.updateOne)

	/**
	 * @openapi
	 * /api/v1/maincategories/{id}:
	 *  delete:
	 *         summary: Deletes a Category
	 *         tags:
	 *             - MainCategories
	 *         requestBody:
	 *             description: Form data that is required to select a category for deletion
	 *             required: true
	 *             content:
	 *                   application/json:
	 *                     schema:
	 *                         $ref: "#/components/schemas/Category"
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
	 *                                       example: Category deleted
	 *                                   data:
	 *                                       type: object
	 *                                       properties:
	 *                                             category:
	 *                                                  type: object
	 *                                                  $ref: "#/components/schemas/Category"
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
	 *                                     example: Error deleting category
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
	.delete(CategoriesController.deleteOne)

module.exports = router
