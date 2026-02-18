const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

app.use(express.json())

let tasks = []
let nextId = 1

app.get('/tasks', (req, res) => {
  const { completed } = req.query
  if (completed === undefined) return res.json(tasks)
  const value = completed === 'true'
  res.json(tasks.filter(t => t.completed === value))
})

app.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  const task = tasks.find(t => t.id === id)
  if (!task) return res.sendStatus(404)
  res.json(task)
})

app.post('/tasks', (req, res) => {
  const { title } = req.body
  if (!title) return res.sendStatus(400)
  const task = { id: nextId++, title, completed: false }
  tasks.push(task)
  res.status(201).json(task)
})

app.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  const task = tasks.find(t => t.id === id)
  if (!task) return res.sendStatus(404)

  const { title, completed } = req.body
  if (title !== undefined) task.title = title
  if (completed !== undefined) task.completed = completed

  res.json(task)
})

app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = tasks.findIndex(t => t.id === id)
  if (index === -1) return res.sendStatus(404)
  tasks.splice(index, 1)
  res.sendStatus(204)
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
