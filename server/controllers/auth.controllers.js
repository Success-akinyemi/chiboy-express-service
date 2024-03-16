import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import StaffModel from '../models/Staff.js'

export async function newStaff(req, res){
    const { name, phoneNumber, role, email } = req.body
    try {
        const hashedPassword = bcryptjs.hashSync(`${process.env.DEFAULT_ADMIN_PASSWORD}`, 10)
        let staffId
        let isUnique = false

        if(email){
            const isExist = await StaffModel.findOne({ email, email })
            if(isExist){
                return res.status(403).json({ success: false, data: 'Email Alreaqdy Exist' })
            }
        }
        
        while (!isUnique){
            staffId = generateRandomSixDigitId();
            const existingUser = await StaffModel.findOne({ staffId: staffId  })
            if(!existingUser){
                isUnique = true
            }
        }
        const newStaff = new StaffModel({
            name,
            phoneNumber,
            role,
            staffId,
            email,
            password: hashedPassword
        })
        await newStaff.save()
        console.log('NEW STAFF CREATED')
        return res.status(201).json({ success: true, data: 'New Staff created' });
    } catch (error) {
        console.log('Unable to create new Staff', error)
        res.status(500).json({ success: false, data: 'Unable to create new staff'})
    }
}

// Function to generate a random six-digit number
function generateRandomSixDigitId() {
    return Math.floor(100000 + Math.random() * 900000); // Generate a number between 100000 and 999999
}

export async function login(req, res){
    const { id, password } = req.body

    try {
        if(!id || !password){
            return res.status(404).json({ success: false, data: 'Fill All Information' })
        }
        let staff = await StaffModel.findOne({ email: id })
        if(!staff){
            staff = await StaffModel.findOne({ phoneNumber: id })
        }
        if(!staff){
            staff = await StaffModel.findOne({ staffId: id })
        }
        if(!staff){
            return res.status(404).json({ success: false, data: 'Invalid User' })
        }
        const validPassword = bcryptjs.compareSync(password, staff.password)
        if(!validPassword){
            return res.status(401).json({ success: false, data: 'Invalid credentials'})
        }

        const token = jwt.sign({ id: staff._id, isAdmin: staff.isAdmin}, process.env.JWT_SECRET)
        const expiryDate = new Date(Date.now() + 12 * 60 * 60 * 1000);
        const { password: staffPassword, ...staffData } = staff._doc 

        res.cookie('accessToken', token, {httpOnly: true,expires: expiryDate, sameSite: 'None', secure: true }).status(200).json({ success: true, data: staffData })
    } catch (error) {
        console.log('FAILED TO LOGIN USER', error)
        res.status(500).json({ success: false, data:'Could not login'})
    }
}

export async function updateStaff(req, res){
    const {id} = req.params
    try {
        const admin = await StaffModel.findById({ _id: id })
        if(!(req.user.id === req.params.id || admin.isAdmin)){
            return res.status(401).json({ success: false, data: 'You can only update you Account'})
        }
        
        if(req.body.newpassword || req.body.newpassword){
            if( admin.isAdmin || !admin.role.toLocaleLowerCase() === 'staff'){
                req.body.password = bcryptjs.hashSync(req.body.newpassword, 10)
            }

            if(!req.body.oldpassword){
                return res.status(404).json({ success: false, data: 'Old Password is neeeded'})
            }
            if(!req.body.newpassword){
                return res.status(404).json({ success: false, data: 'New Password is neeeded'})
            }

            const validPassword = bcryptjs.compareSync(req.body.oldpassword, admin.password)
            if(!validPassword){
                return res.status(401).json({ success: false, data: 'Invalid credentials'})
            }

            req.body.password = bcryptjs.hashSync(req.body.newpassword, 10)
        }

        const updatedStaff = await StaffModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    active: req.body.active,
                    role: req.body.role,
                    phoneNumber: req.body.phonenumber
                }
            },
            { new: true }
        );
        await updatedStaff.save()

        const { password, ...staffData} = updatedStaff._doc
        console.log('UPDATED', staffData)
        res.status(200).json({ success: true, data: staffData })
    } catch (error) {
        console.log('FAILED TO UPDATE USER',error)
        res.status(500).json({ success: false, data: 'Unable to update staff'})
    }
}