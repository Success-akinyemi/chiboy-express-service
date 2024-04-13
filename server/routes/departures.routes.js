import express from 'express'
import { verifyManager, verifyToken } from '../utils/verify.js'
import * as controller from '../controllers/departures.controllers.js'

const router = express.Router()

router.route('/create').post(verifyToken, controller.create) //create new departure
router.route('/update').post(verifyManager, controller.update) //update departure

router.route('/getAll').get(verifyToken, controller.getAllDeparture) //get all departure
router.route('/getOne/:id').get(verifyToken, controller.getADeparture) //get a departure
router.route('/getOneVehicle/:id').get(verifyToken, controller.getVehicleDepartures) //get a departure


export default router