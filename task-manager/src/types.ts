export type TaskStatus = 'Предстоит сделать' | 'В процессе' | 'Готово'
export type TaskCategory = 'Ошибка' | 'Функция' | 'Документация' | 'Рефакторинг' | 'Тест'
export type TaskPriority = 'Низкий' | 'Средний' | 'Высокий'


export interface Task {
  id: string
  title: string
  description?: string
  category: TaskCategory
  status: TaskStatus
  priority: TaskPriority
  deadline?: string 
}
