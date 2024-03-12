import VehicleCategoryModel from "../models/VehicleCategory.js"


export async function createCategory(req, res){
    const { category } = req.body
    try {
        if(!category){
            return res.status(404).json({ success: false, data: 'Category cannot be empty'})
        }
        const catExist = await VehicleCategoryModel.findOne({ category: category })
        if(catExist){
            return res.status(304).json({ success: true, data: 'Category already exist'})
        }

        const newCat = await VehicleCategoryModel.create({
            category
        })

        res.status(201).json({ success: true, data: 'new Vechicle category created'})
    } catch (error) {
        console.log('COULD NOT CREATE NEW CATEGORY', error)
        res.status(500).json({ success: false, data: 'unable to create new vehicle category'})
    }
}

export async function getAllCategories(req, res){
    try {
        const categories = await VehicleCategoryModel.find()

        res.status(200).json({ success: true, data: categories})
    } catch (error) {
        console.log('COULD NOT GET ALL CATEGORIES', error)
        res.status(500).json({ success: false, data: 'Could not get all categories'})
    }
}