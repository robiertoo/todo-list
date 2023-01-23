import { Request, Response } from 'express'
import { FindOperator, IsNull, Not, Repository } from 'typeorm'
import { AppDataSource } from '../database'
import { Task } from '../entities/Task'

export default class TaskController {
  private readonly repository: Repository<Task>

  constructor () {
    this.repository = AppDataSource.getRepository(Task)
  }

  getTasks = (req: Request, res: Response): void => {
    const completed: string | undefined = req.query.completed?.toString()
    let tasksPromise: Promise<Task[]>

    if (typeof req.query.completed === 'undefined') {
      tasksPromise = this.repository.find()
    } else {
      const condition: FindOperator<any> = completed === 'true' ? Not(IsNull()) : IsNull()

      tasksPromise = this.repository.findBy({ completed_at: condition })
    }

    tasksPromise.then((tasks: Task[]) => res.send(tasks))
      .catch((error) => { console.log(error) })
  }

  getTask = (req: Request, res: Response): void => {
    const id = Number.parseInt(req.params.id)

    this.repository.findOneByOrFail({ id })
      .then((task: Task) => res.send(task))
      .catch(error => { console.log(error) })
  }

  createTask = (req: Request, res: Response): void => {
    const task = new Task()
    task.description = req.body.description

    this.repository.save(task)
      .then((task: Task) => res.send(task))
      .catch((error) => { console.log(error) })
  }

  updateTask = (req: Request, res: Response): void => {
    const id = Number.parseInt(req.params.id)

    this.repository.findOneByOrFail({ id })
      .then(async (task: Task) => {
        task.description = req.body.description

        return await this.repository.save(task)
      })
      .then((task: Task) => res.send(task))
      .catch(error => { console.log(error) })
  }

  completeTask = (req: Request, res: Response): void => {
    const id = Number.parseInt(req.params.id)
    this.repository.findOneByOrFail({ id })
      .then((task: Task) => {
        if (task.completed_at !== null) {
          res.send('Task has already been completed')
        } else {
          task.completed_at = new Date()

          this.repository.save(task)
            .then((task: Task) => res.send(task))
            .catch(error => { console.log(error) })
        }
      })
      .catch(error => { console.log(error) })
  }

  deleteTask = (req: Request, res: Response): void => {
    const id: number = Number.parseInt(req.params.id)

    this.repository.softDelete(id)
      .then(() => res.send('Task has been deleted'))
      .catch(error => { console.log(error) })
  }
}
