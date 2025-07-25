import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Task } from '../../../shared/types/index'
import { loadTasksFromLocalStorage } from '../../../shared/lib/localStorage'

type TaskState = {
  tasks: Task[]
}

const initialState: TaskState = {
  tasks: loadTasksFromLocalStorage(),
}


const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload)
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(t => t.id === action.payload.id)
      if (index !== -1) state.tasks[index] = action.payload
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload)
    },
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload
    },
  },
})

export const { addTask, updateTask, deleteTask, setTasks } = taskSlice.actions
export default taskSlice.reducer