import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  return res.send('all tasks')
})

router.get('/:id', (req, res) => {
  return res.send('specific task by id')
})

router.post('/', (req, res) => {
  return res.send('create task')
})

router.put('/:id', (req, res) => {
  return res.send('update task')
})

router.delete('/:id', (req, res) => {
  return res.send('delete task')
})

export default router
