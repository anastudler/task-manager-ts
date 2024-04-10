import { FormEvent, useEffect, useState } from 'react'
import { remult } from 'remult'
import { Task } from './shared/task'
import './App.css'

const taskRepo = remult.repo(Task)
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    taskRepo.find().then(setTasks)
  })
  async function addTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const newTask = await taskRepo.insert({ title: newTaskTitle });
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } catch (error: any) {
      alert(error.message)
    }
  }
  return <><div><h1>Todos</h1></div>
    <main>
      <form onSubmit={e => addTask(e)}>
        <input value={newTaskTitle} placeholder='Add Task' onChange={e => setNewTaskTitle(e.target.value)} />
        <button>Add</button>
      </form>
      {tasks.map(task => {
        return <div key={task.id}>
          <input type="checkbox" checked={task.completed} />
          {task.title}
        </div>
      })}
    </main>
  </>
}

export default App
