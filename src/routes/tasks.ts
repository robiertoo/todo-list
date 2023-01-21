import express from 'express'
import { FindOperator, IsNull, Not } from 'typeorm'
import { AppDataSource } from '../database'
import { Task } from '../entities/Task'

const router = express.Router()
const repository = AppDataSource.getRepository(Task)

router.get('/', (req, res) => {
  const completed: string | undefined = req.query.completed?.toString()
  let tasksPromise: Promise<Task[]>

  if (typeof req.query.completed === 'undefined') {
    tasksPromise = repository.find()
  } else {
    const condition: FindOperator<any> = completed === 'true' ? Not(IsNull()) : IsNull()

    tasksPromise = repository.findBy({ completed_at: condition })
  }

  tasksPromise.then((tasks: Task[]) => res.send(tasks))
    .catch((error) => { console.log(error) })
})

router.get('/:id', (req, res) => {
  const id = Number.parseInt(req.params.id)

  repository.findOneByOrFail({ id })
    .then((task: Task) => res.send(task))
    .catch(error => { console.log(error) })
})

router.post('/', (req, res) => {
  const task = new Task()
  task.description = req.body.description

  repository.save(task)
    .then((task: Task) => res.send(task))
    .catch((error) => { console.log(error) })
})

router.put('/:id', (req, res) => {
  const id = Number.parseInt(req.params.id)

  repository.findOneByOrFail({ id })
    .then(async (task: Task) => {
      task.description = req.body.description

      return await repository.save(task)
    })
    .then((task: Task) => res.send(task))
    .catch(error => { console.log(error) })
})

router.patch('/:id/complete', (req, res) => {
  const id = Number.parseInt(req.params.id)
  repository.findOneByOrFail({ id })
    .then((task: Task) => {
      if (task.completed_at !== null) {
        res.send('Task has already been completed')
      } else {
        task.completed_at = new Date()

        repository.save(task)
          .then((task: Task) => res.send(task))
          .catch(error => { console.log(error) })
      }
    })
    .catch(error => { console.log(error) })
})

router.delete('/:id', (req, res) => {
  const id: number = Number.parseInt(req.params.id)

  repository.softDelete(id)
    .then(() => res.send('Task has been deleted'))
    .catch(error => { console.log(error) })
})

export default router
