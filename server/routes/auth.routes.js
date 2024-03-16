import express from 'express'
import * as controller from '../controllers/auth.controllers.js'
import { verifyAdmin, verifyToken } from '../utils/verify.js'

const router = express.Router()

router.route('/newStaff').post(verifyAdmin, controller.newStaff)
router.route('/login').post(controller.login)
router.route('/updateStaff/:id').post(verifyToken, controller.updateStaff)




export default router