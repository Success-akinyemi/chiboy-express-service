import express from 'express'
import * as controller from '../controllers/finance.controllers.js'
import { verifyToken } from '../utils/verify.js'
const router = express.Router()

router.route('/generateReport').post(verifyToken, controller.generateReport)
router.route('/getReport').post(verifyToken, controller.getReportPDF)

export default router