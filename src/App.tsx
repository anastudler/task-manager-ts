import { useEffect, useState } from 'react'
import { remult } from 'remult'
import { Task } from './shared/task'
import './App.css'

const taskRepo = remult.repo(Task)
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    taskRepo.find().then(setTasks)
  })
  return <><div><h1>Todos</h1></div>
  <main>
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
