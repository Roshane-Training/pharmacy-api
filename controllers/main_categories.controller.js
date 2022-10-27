const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const MainCategory = require('../models/main_categories')

class MainCategoryController {

    /**
     * Create One Main Category Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static createOne = async (req, res) => {
        const createdMaincategory = await MainCategory.create(req.body).catch((error) => {
            ErrorResponse(res, 'error creating category', error, 500)
        })

        SuccessResponse(res, 'category created', createdMaincategory, 201)
    }


    /**
     * Get All Main Category Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static getAll = async (req, res) => {
        const maincategories = await MainCategory.find().catch((error) => {
            return ErrorResponse(res, 'error finding categories', error, 500)
        })

        if (!maincategories || maincategories.lenght <= 0)
            return SuccessResponse(res, 'there are no categories at the moment', maincategories)
        
        return SuccessResponse(res, 'categories found', maincategories)
    }


    /**
     * Get One Main Category Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static getOne = async (req, res) => {
        const maincategory = await MainCategory.findById(req.params.id).catch((error) => {
            return ErrorResponse(res, 'error finding the category with model', error, 500)
        })

        if (!maincategory) return SuccessResponse(res, 'category not found', maincategory)

        return SuccessResponse(res, 'category found', maincategory)
    }


    /**
     * Update One Main Category Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static updateOne = async (req, res) => {
        const { name } = req.body
        const { id: _id } = req.params

        if (!name)
            return ErrorResponse(res, 'no data sent for an update', null, 200)

        const maincategory = await MainCategory.findOne({ _id }).catch ((error) => {
            return ErrorResponse(res, 'error while trying to find category', error, 500)
        })

        if (!maincategory) return ErrorResponse(res, 'no category found')

        const updatedMainCategory = await MainCategory.updateOne(
            { _id },
            { name },
            { returnDocument: true, returnOriginal: true, new: true }
        ).catch((error) => {
            return ErrorResponse(res, 'error updating category', error, 500)
        })

        SuccessResponse(res, 'category updated', updatedMainCategory)
    }


    /**
     * Delete One Main Category Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static deleteOne = async (req, res) => {
        let maincategory = await MainCategory.findByIdAndRemove(req.params.id, {
            returnDocument: true,
        }).catch((error) => {
            ErrorResponse(res, 'error deleting category', error, 500)
        })

        if(!maincategory) return ErrorResponse(res, 'category not found for removal', null, 200)

        return SuccessResponse(res, 'category deleted', maincategory.name)
    }
}

module.exports = MainCategoryController