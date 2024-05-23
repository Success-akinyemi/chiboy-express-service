import express from 'express'
import * as controller from '../controllers/booking.controllers.js'
import { verifyToken } from '../utils/verify.js'
const router = express.Router()

router.route('/createBooking').post(verifyToken, controller.createBooking)
router.route('/getReceipt').post(verifyToken, controller.generateReceipt)
router.route('/updateBooking').post(verifyToken, controller.updateBooking)


router.route('/getBooking').get(verifyToken, controller.getBooking)
router.route('/getBooking/:id').get(verifyToken, controller.getABooking)
router.route('/corn-job-Booking').get(controller.cornJobBooking)

export default router