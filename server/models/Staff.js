import mongoose from "mongoose";

const StafSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide staff name']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide staff phone number']
    },
    email: {
        type: String,
    },
    staffId: {
        type: String
    },
    role: {
        type: String,
        default: 'Staff'
        //Staff Manager Admin
    },
    password: {
        type: String,
        required: [true, 'Please provide a staff password']
    },
    profileImage: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    }
},
{timestamps: true}
)

const StaffModel = mongoose.model('chiboyStaff', StafSchema)
export default StaffModel