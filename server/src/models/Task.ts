import fs from 'fs'
import path from 'path'
// Путь к файлу базы данных с задачами
const dbPath = path.join(__dirname, '../../db.json')
import type {Task} from '../data/tasks'

/**
 * Читает задачи из файла db.json.
 * @returns {Task[]} Массив задач.
 * @throws Ошибка, если файл не найден или данные некорректны.
 */
function readTasks(): any[] {
  const data = fs.readFileSync(dbPath, 'utf-8')
  return JSON.parse(data).tasks
}

/**
 * Записывает массив задач в файл db.json.
 * @param {Task[]} tasks - Массив задач для сохранения.
 */
function writeTasks(tasks: Task[]): void {
  fs.writeFileSync(dbPath, JSON.stringify({ tasks }, null, 2), 'utf-8')
}

export { readTasks, writeTasks }