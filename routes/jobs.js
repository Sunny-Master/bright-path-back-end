import { Router } from 'express'
import * as jobsCtrl from '../controllers/jobs.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)

//GET routes
router.get('/:jobId', checkAuth, jobsCtrl.show)

//POST routes
router.post('/', checkAuth, jobsCtrl.create)

//PUT routes
router.put('/:jobId', checkAuth, jobsCtrl.update)

export { router }