import BookingModel from "../models/Booking.js"
import Departuremodel from "../models/Departures.js"
import VehicleModel from "../models/Vehicle.js"
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

export async function getACategory(req, res){
    const { id } = req.params
    try {
        const category = await VehicleCategoryModel.findById({ _id: id})
        if(!category){
            return res.status(404).json({ success: true, data: 'category does not exist'})
        }
        
        res.status(200).json({ success: true, data: category})
    } catch (error) {
        console.log('COULD NOT GET ALL CATEGORIES', error)
        res.status(500).json({ success: false, data: 'Could not get category'})
    }
}

export async function updateCategory(req, res){
    const { id } = req.params
    const { newCategory } = req.body
    try {
        const findVehicleCat = await VehicleCategoryModel.findById({ _id:id})
        if(!findVehicleCat){
            return res.status(404).json({ success: false, data: 'No vehicle category found'})
        }

        if(findVehicleCat.category === newCategory){
            return res.status(400).json({ success: false, data: 'No changes made'})
        }

        console.log('newCategory', findVehicleCat.category)

         //get all bookings with particular category and update it to newCategory
         const bookings = await BookingModel.find({ vechicletype: findVehicleCat.category })
         if(bookings){
             await BookingModel.updateMany({ vechicletype: findVehicleCat.category }, { $set: { vechicletype: newCategory } }, { $new: true })
         }
         //get all vehicle with particular category and update it to newCategory
         const vechiles = await VehicleModel.find({ vechicletype: findVehicleCat.category })
         if(vechiles){
             console.log(vechiles)
             await VehicleModel.updateMany({ vechicletype: findVehicleCat.category }, { $set: { vechicletype: newCategory } }, { $new: true })
         }
         //get all departures with particular category and update it to newCategory
         const departure = await Departuremodel.find({ vechicletype: findVehicleCat.category })
         if(departure){
             console.log(vechiles)
             await Departuremodel.updateMany({ vechicletype: findVehicleCat.category }, { $set: { vechicletype: newCategory } }, { $new: true })
         }

         console.log('VEHICLE', vechiles)
         console.log('BOOKING', bookings)
         console.log('DEPARTURE', departure)

        //update vehicle category
        findVehicleCat.category = newCategory
        await findVehicleCat.save()
        console.log('first', findVehicleCat.category)


        res.status(201).json({ success: true, data: 'Vehicle category updated' })
    } catch (error) {
        console.log('UNABLE TO UPDATE VEHICLE CATEGORY', error)
        res.status(500).json({ success: false, data: 'Failed to update vehicle category' })
    }
}

export async function deleteVehicleCategory(req, res){
    const { id } = req.params
    console.log('ID', id)
    try {
        const isExist = await VehicleCategoryModel.findByIdAndDelete({ _id: id})

        res.status(200).json({ success: true, data: 'Vehicle deleted successfully'})
    } catch (error) {
        console.log('UNABLE TO DELETE VEHICLE', error)
        res.status(500).json({ success: false, data: 'Unable to delete vehicle'})
    }
}