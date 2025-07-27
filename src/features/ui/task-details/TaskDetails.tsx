import { useParams, useNavigate } from 'react-router-dom'
import type { Task, TaskCategory, TaskPriority, TaskStatus } from '../../../shared/types'
import { useState, useEffect } from 'react'
import{taskCategoryOptions, taskStatusOptions, taskPriorityOptions} from '../../../widgets/option-list/options'
import './TaskDetails.css'

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<TaskCategory>('Ошибка')
  const [status, setStatus] = useState<TaskStatus>('Предстоит сделать')
  const [priority, setPriority] = useState<TaskPriority>('Низкий')
  const [deadline, setDeadline] = useState('')
  
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:3001/tasks/${id}`)
        if (!res.ok) throw new Error('Ошибка при загрузке задачи')
        const task: Task = await res.json()

        setTitle(task.title)
        setDescription(task.description ?? '')
        setCategory(task.category)
        setStatus(task.status)
        setPriority(task.priority)
        setDeadline(task.deadline ?? '')
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const updatedTask: Task = {
      id: id!,
      title,
      description,
      category,
      status,
      priority,
      deadline
    }

    try {
      const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      })

      if (!res.ok) throw new Error('Ошибка при обновлении задачи')
      navigate('/')
    } catch (err) {
      setError((err as Error).message)
    }
  }

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>

  return (
    <div className="task-details-container">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Редактировать задачу</h2>

        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Описание"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <select value={category} onChange={e => setCategory(e.target.value as TaskCategory)}>
          {taskCategoryOptions}
        </select>

        <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)}>
          {taskStatusOptions}
        </select>

        <select value={priority} onChange={e => setPriority(e.target.value as TaskPriority)}>
          {taskPriorityOptions}
        </select>

        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />

        <div className="task-details-buttons">
          <button className="save-btn" type="submit">Сохранить</button>
          <button className="cancel-btn" type="button" onClick={() => navigate('/')}>Отмена</button>
        </div>
      </form>
    </div>
  )
}

export default TaskDetails