import express from 'express'
import * as controller from '../controllers/auth.controllers.js'
import { verifyAdmin, verifyToken } from '../utils/verify.js'

const router = express.Router()

//router.route('/newStaff').post(verifyAdmin, controller.newStaff) // create new staff

router.route('/newStaff').post(controller.newStaff) // create new staff


router.route('/login').post(controller.login) //staff login
router.route('/updateStaff/:id').post(verifyToken, controller.updateStaff) // update staff
router.route('/signout').post(controller.signout)


router.route('/getAllstaffs').get(verifyToken, controller.getAllStaffs) //get all staff
router.route('/getAStaff/:id').get(verifyToken, controller.getAStaff) //get a staff



export default router