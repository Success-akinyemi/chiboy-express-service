import jwt from "jsonwebtoken"
import StaffModel from "../models/Staff.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken
    console.log('TOKEN>>', token)

    if(!token) return res.status(401).json({ success: false, data: 'Not Allowed Please Login again'})

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({ success: false, data: 'User Forbidden Please Login'})
    
        req.user = user;
        next();
    });
}

export const verifyManager = async (req, res, next) => {
    verifyToken(req, res, async () => {
        const user = await StaffModel.findById({ _id: req.user.id})
        if(user?.role.toLocaleLowerCase() === 'manager' || user?.role.toLocaleLowerCase() === 'admin' || user?.isAdmin){
            req.user = user;
            next()
        } else {
            return res.status(413).json({ success: false, data: 'NOT ALLOWED'})
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, async () => {
        const user = await StaffModel.findById({ _id: req.user.id})
        console.log('first', user.isAdmin)
        if(user.isAdmin){
            next()
        } else {
            return res.status(413).json({ success: false, data: 'You are Forbidden'})
        }
    })
}

export const verifyAdminToken = (req, res, next) => {
    const token = req.cookies.adminAccessToken
    console.log('ADMIN TOK',token)

    if(!token) return res.status(410).json({ success: false, data: 'Not Allowed Please Login'})

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(413).json({ success: false, data: 'User Forbidden Please Login'})
    
        req.user = user;
        next();
    });
}


export const verifyTokenAndAdmin = (req, res, next) => {
    verifyAdminToken(req, res, () => {
        if(req.user.isAdmin){
            next()
        } else {
            return res.status(413).json({ success: false, data: 'You are Forbidden'})
        }
    })
}

