const express = require('express')
const router = express.Router()
const ProductsController = require('../controllers/products.controller')
const Upload = require('../middlewares/multer')

// //Getting Image
// //storage
// const Storage = multer.diskStorage({
//     destination: 'upload',
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });
// const upload = multer({
//     storage: Storage,
// }).single('image')

router
	.route('/')

	/**
	 * @openapi
	 * /api/v1/products:
	 *  get:
	 *       tags:
	 *           - Products
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
	 *                                   example: Products found
	 *
	 */
	.get(ProductsController.getAll)

	/**
	 * @openapi
	 * /api/v1/products:
	 *  post:
	 *      summary: Create a New Product
	 *      tags:
	 *          - Products
	 *      requestBody:
	 *          description: Form data required to create a new product
	 *          required: true
	 *          content:
	 *              application/json:
	 *                  schema:
	 *                      $ref: "#/components/schemas/Product"
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
	 *                                  example: Product created
	 *                              data:
	 *                                  type: object
	 *                                  properties:
	 *                                      product:
	 *                                              type: object
	 *                                              $ref: "#/components/schemas/Product"
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
	 *                                  example: Error creating product
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
	.post(Upload.single('image'), ProductsController.createOne)

router
	.route('/:id')

	/**
	 * @openapi
	 * /api/v1/products/{id}:
	 *  get:
	 *      summary: Retrieves a Product
	 *      tags:
	 *          - Products
	 *      requestBody:
	 *          description: Form data that selects and gives access to a product
	 *          required: true
	 *          content:
	 *                application/json:
	 *                  schema:
	 *                      $ref: "#/components/schemas/Product"
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
	 *                                   example: Product found
	 *                                data:
	 *                                   type: object
	 *                                   properties:
	 *                                         product:
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
	 *                                  example: Error finding product with model
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
	.get(ProductsController.getOne)

	/**
	 * @openapi
	 * /api/v1/products/{id}:
	 *  patch:
	 *        summary: Updates a Product
	 *        tags:
	 *            - Products
	 *        requestBody:
	 *            description: Form data required to update a product
	 *            required: true
	 *            content:
	 *                  application/json:
	 *                    schema:
	 *                        $ref: "#/components/schemas/Product"
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
	 *                                     example: Product updated
	 *                                  data:
	 *                                     type: object
	 *                                     properties:
	 *                                           product:
	 *                                                type: object
	 *                                                $ref: "#/components/schemas/Product"
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
	 *                                    example: Error updating product
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
	.patch(ProductsController.updateOne)

	/**
	 * @openapi
	 * /api/v1/products/{id}:
	 *  delete:
	 *         summary: Deletes a Product
	 *         tags:
	 *             - Products
	 *         requestBody:
	 *             description: Form data that is required to select a product for deletion
	 *             required: true
	 *             content:
	 *                   application/json:
	 *                     schema:
	 *                         $ref: "#/components/schemas/Product"
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
	 *                                       example: Product deleted
	 *                                   data:
	 *                                       type: object
	 *                                       properties:
	 *                                             product:
	 *                                                  type: object
	 *                                                  $ref: "#/components/schemas/Product"
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
	 *                                     example: Error deleting product
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
	.delete(ProductsController.deleteOne)

module.exports = router
