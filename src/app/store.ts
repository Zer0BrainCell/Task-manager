import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../entities/task/model/taskSlice'
import { saveTasksToLocalStorage } from '../shared/lib/localStorage'

export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
})

store.subscribe(()=>{
  const state =store.getState()
  saveTasksToLocalStorage(state.task.tasks)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
