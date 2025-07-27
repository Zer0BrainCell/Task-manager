import express from 'express'
import { readTasks, writeTasks } from '../models/Task'

const router = express.Router()

/**
 * Получить все задачи.
 * GET /tasks
 */
router.get('/', (req, res) => {
  const tasks = readTasks()
  res.json(tasks)
})

/**
 * Получить задачу по ID.
 * GET /tasks/:id
 */
router.get('/:id', (req, res) => {
  const tasks = readTasks()
  const task = tasks.find(t => t.id === req.params.id)
  if (!task) return res.status(404).json({ error: 'Not found' })
  res.json(task)
})

/**
 * Создать новую задачу.
 * POST /tasks
 * Тело запроса должно содержать поля задачи без id, он генерируется здесь.
 */
router.post('/', (req, res) => {
  const tasks = readTasks()
  const newTask = { id: Date.now().toString(), ...req.body }
  tasks.push(newTask)
  writeTasks(tasks)
  res.status(201).json(newTask)
})

/**
 * Удалить задачу по ID.
 * DELETE /tasks/:id
 */
router.delete('/:id', (req, res) => {
  let tasks = readTasks()
  tasks = tasks.filter(t => t.id !== req.params.id)
  writeTasks(tasks)
  res.status(204).send()
})


/**
 * Обновить задачу по ID.
 * PUT /tasks/:id
 * Тело запроса содержит обновленные поля задачи.
 */
router.put('/:id', (req, res) => {
  const tasks = readTasks()
  const index = tasks.findIndex(t => t.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Not found' })

  tasks[index] = { ...tasks[index], ...req.body }
  writeTasks(tasks)
  res.json(tasks[index])
})

export default router