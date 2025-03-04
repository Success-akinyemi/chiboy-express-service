import express from 'express'
import * as controller from '../controllers/finance.controllers.js'
import { verifyAdmin, verifyToken } from '../utils/verify.js'
const router = express.Router()

router.route('/generateReport').post(verifyToken, verifyAdmin, controller.generateReport)
router.route('/getReport').post(verifyToken, verifyAdmin, controller.getReportPDF)

export default router