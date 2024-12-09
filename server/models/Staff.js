import mongoose from "mongoose";
import jsonwebtoken from 'jsonwebtoken'

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
        default: 'Staff',
        enum: ['Staff', 'Manager', 'Admin']
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
);

StafSchema.methods.getSignedToken = function(){
    return jsonwebtoken.sign({ id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE})
}

const StaffModel = mongoose.model('chiboyStaff', StafSchema)
export default StaffModel