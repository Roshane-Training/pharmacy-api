const express = require('express')
const router = express.Router()
const MainCategoriesController = require('../controllers/main_categories.controller')

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
	 *                                   example: Main Category found
     * 
	 */
    .get(MainCategoriesController.getAll)

    /**
	 * @openapi
	 * /api/v1/maincategories:
	 *  post:
	 *      summary: Create a New Main Category
	 *      tags:
	 *          - MainCategories
	 *      requestBody:
	 *          description: Form data required to create a new main category
	 *          required: true
	 *          content:
	 *              application/json:
	 *                  schema:
	 *                      $ref: "#/components/schemas/MainCategory"
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
	 *                                  example: Main Category created
	 *                              data:
	 *                                  type: object
	 *                                  properties:
	 *                                      maincategory:
	 *                                           type: object
	 *                                           $ref: "#/components/schemas/MainCategory"
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
	 *                                  example: Error creating main category
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
    .post(MainCategoriesController.createOne)

router
    .route('/:id')

    /**
	 * @openapi
	 * /api/v1/maincategories/{id}:
	 *  get:
	 *      summary: Retrieves a Main Category
	 *      tags:
	 *          - MainCategories
	 *      requestBody:
	 *          description: Form data that selects and gives access to a main category
	 *          required: true
	 *          content:
	 *                application/json:
	 *                  schema:
	 *                      $ref: "#/components/schemas/MainCategory"
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
	 *                                   example: Main Category found 
	 *                                data:
	 *                                   type: object
	 *                                   properties:
	 *                                         maincategory:
	 *                                              type: object
	 *                                              $ref: "#/components/schemas/MainCategory" 
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
	 *                                  example: Error finding main category with model
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
    .get(MainCategoriesController.getOne)

    /**
	 * @openapi
	 * /api/v1/maincategories/{id}:
	 *  patch:
	 *        summary: Updates a Main Category
	 *        tags:
	 *            - MainCategories
	 *        requestBody:
	 *            description: Form data required to update a main category
	 *            required: true
	 *            content:
	 *                  application/json:
	 *                    schema:
	 *                        $ref: "#/components/schemas/MainCategory"
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
	 *                                     example: Main Category updated
	 *                                  data: 
	 *                                     type: object
	 *                                     properties:
	 *                                           maincategory:
	 *                                                type: object
	 *                                                $ref: "#/components/schemas/MainCategory"
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
	 *                                    example: Error updating main category
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
    .patch(MainCategoriesController.updateOne)

    /**
	 * @openapi
	 * /api/v1/maincategories/{id}:
	 *  delete:
	 *         summary: Deletes a Main Category
	 *         tags:
	 *             - MainCategories
	 *         requestBody:
	 *             description: Form data that is required to select a main category for deletion
	 *             required: true
	 *             content:
	 *                   application/json:
	 *                     schema:
	 *                         $ref: "#/components/schemas/MainCategory"
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
	 *                                       example: Main Category deleted
	 *                                   data:
	 *                                       type: object
	 *                                       properties: 
	 *                                             maincategory:
	 *                                                  type: object
	 *                                                  $ref: "#/components/schemas/MainCategory"
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
	 *                                     example: Error deleting main category
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
    .delete(MainCategoriesController.deleteOne)

module.exports = router