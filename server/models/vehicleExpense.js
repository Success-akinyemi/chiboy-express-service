import mongoose from "mongoose";

const VehicleExpenseSchema = new mongoose.Schema({
    vehicletype: {
        type: String
    },
    vehicle: {
        type: String
    },
    vehicleid: {
        type: String
    },
    amount: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    preparedby: {
        type: String
    },
    updatedby: {
        type: String,
        default: ''
    },
    expenseid: {
        type: String
    },
},
{timestamps: true}
)

const VehicleExpenseModel = mongoose.model('vehicleExpense', VehicleExpenseSchema)
export default VehicleExpenseModel