import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    vechicletype: {
        type: String,
        required: [true, 'Provide the type of vehicle']
        //-sieana -hiace buse -luxurious
    },
    registrationnumber: {
        type: String,
        required: [true, 'Vehicle registration number is required']
    },
    drivername: {
        type: String
    },
    vehiclename: {
        type: String
    },
    numberofseat: {
        type: Number
    },
    preparedby:{
        type: String
    }
},
{timestamps: true}
)

const VehicleModel = mongoose.model('chiboyVehicle', VehicleSchema)
export default VehicleModel