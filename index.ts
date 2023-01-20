import express from 'express'
import bodyParser from 'body-parser'
import TasksRoutes from './src/routes/tasks'

const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.send('welcome to the todo-list app')
})

app.use('/tasks', TasksRoutes)

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})
