import {api} from './axios'
import type { Task } from '../types'

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await api.get('/tasks')
    return response.data
}

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await api.post('/tasks', task)
    return response.data
}

export const getTaskById = async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`)
    return response.data
}

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, task)
  return response.data
}

export const deleteTask = async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`)
}
