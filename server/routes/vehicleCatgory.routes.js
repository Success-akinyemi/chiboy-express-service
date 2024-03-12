import express from 'express'
import * as controller from '../controllers/vehicleCategory.controllers.js'
const router = express.Router()

router.route('/create').post(controller.createCategory) //create vehicle category
//router.route().post() //update vehicle category

//router.route().post() //delete vehicle category


router.route('/getCategories').get(controller.getAllCategories) //fetch vehicle category


export default router