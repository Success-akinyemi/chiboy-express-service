import mongoose from "mongoose";

const StafSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide staff name']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Please provide staff phone number']
    },
    role: {
        type: String,
        default: 'Staff'
        //staff manager admin
    },
    password: {
        type: String,
        required: [true, 'Please provide a staff password']
    },
    profileImage: {
        type: String,
        default: ''
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},
{timestamps: true}
)

const StaffModel = mongoose.model('chiboyStaff', StafSchema)
export default StaffModel