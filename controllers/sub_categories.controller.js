const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const SubCategory = require('../models/sub_categories')

class SubCategoryController {

    /**
     * Create One Sub Category Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static createOne = async (req, res) => {
        const createdSubcategory = await SubCategory.create(req.body).catch((error) => {
            ErrorResponse(res, 'error creating category', error, 500)
        })

        SuccessResponse(res, 'category created', createdSubcategory, 201)
    }


    /**
     * Get All Sub Category Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static getAll = async (req, res) => {
        const subcategories = await SubCategory.find().catch((error) => {
            return ErrorResponse(res, 'error finding categories', error, 500)
        })

        if (!subcategories || subcategories.lenght <= 0)
            return SuccessResponse(res, 'there are no categories at the moment', subcategories)
        
        return SuccessResponse(res, 'categories found', subcategories)
    }


    /**
     * Get One SubCategory Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static getOne = async (req, res) => {
        const subcategory = await SubCategory.findById(req.params.id).catch((error) => {
            return ErrorResponse(res, 'error finding the category with model', error, 500)
        })

        if (!subcategory) return SuccessResponse(res, 'category not found', subcategory)

        return SuccessResponse(res, 'category found', subcategory)
    }


    /**
     * Update One Sub Category Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static updateOne = async (req, res) => {
        const { name } = req.body
        const { main_categoryId } = req.body
        const { id: _id } = req.params

        if (!name && !main_categoryId)
            return ErrorResponse(res, 'no data sent for an update', null, 200)

        const subcategory = await SubCategory.findOne({ _id }).catch ((error) => {
            return ErrorResponse(res, 'error while trying to find category', error, 500)
        })

        if (!subcategory) return ErrorResponse(res, 'no category found')

        const updatedSubCategory = await SubCategory.updateOne(
            { _id },
            { name },
            { main_categoryId },
            { returnDocument: true, returnOriginal: true, new: true }
        ).catch((error) => {
            return ErrorResponse(res, 'error updating category', error, 500)
        })

        SuccessResponse(res, 'category updated', updatedSubCategory)
    }


    /**
     * Delete One Sub Category Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static deleteOne = async (req, res) => {
        let subcategory = await SubCategory.findByIdAndRemove(req.params.id, {
            returnDocument: true,
        }).catch((error) => {
            ErrorResponse(res, 'error deleting category', error, 500)
        })

        if(!subcategory) return ErrorResponse(res, 'category not found for removal', null, 200)

        return SuccessResponse(res, 'category deleted', subcategory.name)
    }
}

module.exports = SubCategoryController