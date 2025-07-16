import { createContext, useContext, useState, useEffect} from "react"
import type { Task } from "../types"

interface TaskContextType {
tasks:Task[]
updateTask: (task: Task) => void
addTask: (task: Task) => void
removeTask: (id: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
  const stored = localStorage.getItem('tasks')
  return stored ? JSON.parse(stored) : []
})
  const updateTask = (task: Task) => {
    setTasks(prev =>
      prev.map(t => (t.id === task.id ? task : t))
    )
  }
    const addTask = (newTask: Task) => {
    setTasks(prev => [...prev, newTask])
  }
  useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}, [tasks])
    const removeTask = (id: string) => { setTasks(prev => prev.filter(t => t.id !== id))
}

  return (
    <TaskContext.Provider value={{ tasks, updateTask, addTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  )
}
export const useTasks = () => {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used within a TaskProvider')
  return ctx
}