import type { Task } from '../types'

const TASKS_KEY = 'tasks'

export const loadTasksFromLocalStorage = (): Task[] => {
  try {
    const data = localStorage.getItem(TASKS_KEY)
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.error('Failed to load tasks', e)
    return []
  }
}

export const saveTasksToLocalStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  } catch (e) {
    console.error('Failed to save tasks', e)
  }
}