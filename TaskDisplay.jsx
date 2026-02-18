import { useEffect, useState } from 'react'
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from './TaskApi'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  const loadTasks = async () => {
    const res = await getTasks()
    setTasks(res.data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleCreate = async () => {
    if (!title) return
    await createTask(title)
    setTitle('')
    loadTasks()
  }

  const handleToggle = async (task) => {
    await updateTask(task.id, { completed: !task.completed })
    loadTasks()
  }

  const handleDelete = async (id) => {
    await deleteTask(id)
    loadTasks()
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Manager</h1>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={handleCreate}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              onClick={() => handleToggle(task)}
              style={{
                cursor: 'pointer',
                textDecoration: task.completed ? 'line-through' : 'none'
              }}
            >
              {task.title}
            </span>
            <button onClick={() => handleDelete(task.id)}>DELETE</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
