import express from 'express'
import * as controller from '../controllers/vehicle.controllers.js'
import { verifyToken } from '../utils/verify.js'
const router = express.Router()

router.route('/create').post(verifyToken, controller.create) //create a new vehicle
router.route('/update').post(verifyToken, controller.update) //update a vehicle


router.route('/getAll').post(verifyToken, controller.getAll) //get all vehicle
router.route('/getOne').post(verifyToken, controller.getOne) //get a vehicle


export default router