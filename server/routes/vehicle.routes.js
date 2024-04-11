import express from 'express'
import * as controller from '../controllers/vehicle.controllers.js'
import { verifyToken } from '../utils/verify.js'
const router = express.Router()

router.route('/create').post(verifyToken, controller.create) //create a new vehicle
router.route('/update/:id').post(verifyToken, controller.update) //update a vehicle
router.route('/remove/:id').post(verifyToken, controller.deleteVehicle) //delete a vehicle
router.route('/expense').post(verifyToken, controller.expense) //create a new vehicle expense



router.route('/getAll').get(verifyToken, controller.getAll) //get all vehicle
router.route('/getOne/:id').get(verifyToken, controller.getOne) //get a vehicle
router.route('/getAllexpense').get(verifyToken, controller.getAllexpense) //get all vehicle expenses
router.route('/getOneExpense/:id').get(verifyToken, controller.getOneExpense) //get one vehicle expenses



export default router