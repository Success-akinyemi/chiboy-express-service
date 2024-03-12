import mongoose from "mongoose";

const DepartureSchema = new mongoose.Schema({
    vechicleid: {
        type: String,
        required: true
    },
    vechicletype: {
        type: String,
    },
    numberofpassengers: {
        type: Number,
        required: true
    },
    totalamount: {
        type: Number
    },
    fullpayment: {
        type: String,
    },
    balancepayment: {
        type: Number
    },
    travelingfrom: {
        type: String
    },
    travelingto: {
        type: String
    },
    drivername: {
        type: String
    }
},
{timestamps: true}
)

const Departuremodel = mongoose.model('chiboyDeparture', DepartureSchema)
export default Departuremodel