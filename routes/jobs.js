import { Router } from 'express'
import * as jobsCtrl from '../controllers/jobs.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, jobsCtrl.create)

export { router }