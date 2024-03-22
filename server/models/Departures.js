import mongoose from "mongoose";

const DepartureSchema = new mongoose.Schema({
    vechicleid: {
        type: String,
        required: true
    },
    vechicletype: {
        type: String,
        required: true
    },
    numberofpassengers: {
        type: Number,
        required: true
    },
    totalamount: {
        type: Number,
        required: true
    },
    fullpayment: {
        type: String,
        required: true
    },
    balancepayment: {
        type: Number
    },
    travelingfrom: {
        type: String,
        required: true
    },
    travelingto: {
        type: String,
        required: true
    },
    drivername: {
        type: String,
        required: true
    },
    receiptId: {
        type: String,
        required: true
    },
    preparedby: {
        type: String,
        required: true
    },
    departuretime: {
        type: String,
        required: true
    },
    updatedby: {
        type: String
    },
},
{timestamps: true}
)

const Departuremodel = mongoose.model('chiboyDeparture', DepartureSchema)
export default Departuremodel