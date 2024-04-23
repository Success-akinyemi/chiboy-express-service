import express from 'express'
import * as controller from '../controllers/sms.contollers.js'
import { verifyToken } from '../utils/verify.js'
const router = express.Router()

router.route('/sendSms').post(verifyToken, controller.sendSms)


//GET
router.route('/getSmsBalance').get(verifyToken, controller.getSmsBalance)




export default router