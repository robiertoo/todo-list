import express from 'express'
import TaskController from '../controllers/TaskController'

const router = express.Router()
const controller = new TaskController()

router.get('/', controller.getTasks)
router.get('/:id', controller.getTask)
router.post('/', controller.createTask)
router.put('/:id', controller.updateTask)
router.patch('/:id/complete', controller.completeTask)
router.delete('/:id', controller.deleteTask)

export default router
