const express = require('express')
const router = express.Router()
const SubCategoriesController = require('../controllers/sub_categories.controller')

router
    .route('/')

    /**
	 * @openapi
	 * /api/v1/subcategories:
	 *  get:
	 *       tags:
	 *           - SubCategories
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
	 *                                   example: Sub Categories found
	 */
    .get(SubCategoriesController.getAll)

    /**
	 * @openapi
	 * /api/v1/subcategories:
	 *  post:
	 *      summary: Create a New Sub Category
	 *      tags:
	 *          - SubCategories
	 *      requestBody:
	 *          description: Form data required to create a new sub category
	 *          required: true
	 *          content:
	 *              application/json:
	 *                  schema:
	 *                      $ref: "#/components/schemas/SubCategory"
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
	 *                                  example: Sub Category created
	 *                              data:
	 *                                  type: object
	 *                                  properties:
	 *                                      subcategory:
	 *                                           type: object
	 *                                           $ref: "#/components/schemas/SubCategory"
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
	 *                                  example: Error creating sub category
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
    .post(SubCategoriesController.createOne)

router
    .route('/:id')

    /**
	 * @openapi
	 * /api/v1/subcategories/{id}:
	 *  get:
	 *      summary: Retrieves a Sub Category
	 *      tags:
	 *          - SubCategories
	 *      requestBody:
	 *          description: Form data that selects and gives access to a sub category
	 *          required: true
	 *          content:
	 *                application/json:
	 *                  schema:
	 *                      $ref: "#/components/schemas/SubCategory"
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
	 *                                   example: Sub Category found 
	 *                                data:
	 *                                   type: object
	 *                                   properties:
	 *                                         subcategory:
	 *                                              type: object
	 *                                              $ref: "#/components/schemas/SubCategory" 
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
	 *                                  example: Error finding sub category with model
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
    .get(SubCategoriesController.getOne)

    /**
	 * @openapi
	 * /api/v1/subcategories/{id}:
	 *  patch:
	 *        summary: Updates a Sub Category
	 *        tags:
	 *            - SubCategories
	 *        requestBody:
	 *            description: Form data required to update a sub category
	 *            required: true
	 *            content:
	 *                  application/json:
	 *                    schema:
	 *                        $ref: "#/components/schemas/SubCategory"
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
	 *                                     example: Sub Category updated
	 *                                  data: 
	 *                                     type: object
	 *                                     properties:
	 *                                           subcategory:
	 *                                                type: object
	 *                                                $ref: "#/components/schemas/SubCategory"
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
	 *                                    example: Error updating sub category
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
    .patch(SubCategoriesController.updateOne)

    /**
	 * @openapi
	 * /api/v1/subcategories/{id}:
	 *  delete:
	 *         summary: Deletes a Sub Category
	 *         tags:
	 *             - SubCategories
	 *         requestBody:
	 *             description: Form data that is required to select a sub category for deletion
	 *             required: true
	 *             content:
	 *                   application/json:
	 *                     schema:
	 *                         $ref: "#/components/schemas/SubCategory"
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
	 *                                       example: Sub Category deleted
	 *                                   data:
	 *                                       type: object
	 *                                       properties: 
	 *                                             subcategory:
	 *                                                  type: object
	 *                                                  $ref: "#/components/schemas/SubCategory"
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
	 *                                     example: Error deleting sub category
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
    .delete(SubCategoriesController.deleteOne)

module.exports = router