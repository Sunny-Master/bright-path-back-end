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
router.post('/:jobId/tasks', checkAuth, jobsCtrl.createTask)

//PUT routes
router.put('/:jobId', checkAuth, jobsCtrl.update)
router.put('/:jobId/tasks', checkAuth, jobsCtrl.updateTask)

//Delete routes
router.delete('/:jobId', checkAuth, jobsCtrl.delete)

export { router }