import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phonenumber: {
        type: String
    },
    numberofseat: {
        type: String
    },
    travelingfrom: {
        type: String
    },
    travelingto: {
        type: String
    },
    vechicletype: {
        type: String
    },
    amount: {
        type: Number
    },
    balancepayment: {
        type: Number
    },
    fullpayment: {
        type: String
    },
    departuretdate: {
        type: String
    },
    departuretime: {
        type: String
    },
    nextofkin: {
        type: String
    },
    nextofkinnumber: {
        type: String
    },
    bloodgroup:  {
        type: String
    },
    paymenttype: {
        type: String
    },
    receiptId: {
        type: String
    },
    preparedby: {
        type: String
    },
    updatedby: {
        type: String
    },
},
{timestamps: true}
)

const BookingModel = mongoose.model('chiboyBooking', BookingSchema)
export default BookingModel