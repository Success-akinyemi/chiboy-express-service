import express from 'express'
import * as controller from '../controllers/vehicleCategory.controllers.js'
import { verifyToken } from '../utils/verify.js'
const router = express.Router()

router.route('/create').post(verifyToken, controller.createCategory) //create vehicle category
router.route('/update/:id').post(verifyToken, controller.updateCategory) //update vehicle category
router.route('/delete/:id').post(verifyToken, controller.deleteVehicleCategory) //delete vehicle category


//router.route().post() //delete vehicle category


router.route('/getCategories').get(verifyToken, controller.getAllCategories) //fetch vehicle category
router.route('/getCategory/:id').get(verifyToken, controller.getACategory) //fetch vehicle category



export default router