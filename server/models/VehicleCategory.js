import mongoose from "mongoose";

const VehicleCategorySchema = new mongoose.Schema({
    category: {
        type: String
    }
},
{timestamps: true}
)

const VehicleCategoryModel = mongoose.model('vehicleCategory', VehicleCategorySchema)
export default VehicleCategoryModel