import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Task, TaskCreate } from '../../../shared/types/index' 
import { api } from '../../../shared/api/axios'

type TaskState = {
  tasks: Task[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null,
}


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await api.get<Task[]>('/tasks')
  return response.data
})

export const createTask = createAsyncThunk('tasks/createTask', async (task: TaskCreate) => {
  const response = await api.post<Task>('/tasks', task)
  return response.data
})

export const editTask = createAsyncThunk('tasks/editTask', async (task: Task) => {
  const response = await api.patch<Task>(`/tasks/${task.id}`, task)
  return response.data
})

export const removeTask = createAsyncThunk('tasks/removeTask', async (id: string) => {
  await api.delete(`/tasks/${id}`)
  return id
})


const taskSlice = createSlice({
  name: 'tasks',
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
    extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded'
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? null
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload)
      })
      .addCase(editTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id)
        if (index !== -1) state.tasks[index] = action.payload
      })
      .addCase(removeTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(t => t.id !== action.payload)
      })
  },
})

export const { addTask, updateTask, deleteTask, setTasks } = taskSlice.actions

export default taskSlice.reducer