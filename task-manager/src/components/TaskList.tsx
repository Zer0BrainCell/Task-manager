import { useTasks } from '../context/TaskContext'
import TaskItem from '../components/TaskItem'
import { useState } from 'react'
import type { TaskCategory, TaskPriority, TaskStatus } from '../types'
import './TaskList.css'

const TaskList = () => {
  const { tasks, addTask } = useTasks()
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('Предстоит сделать')
  const [priority, setPriority] = useState('')
  const [deadline, setDeadline] = useState('')
  const handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault()
    const newTask = {
        id:Date.now().toString(),
        title,
        description,
        category: category as TaskCategory,
        status: status as TaskStatus,
        priority: priority as TaskPriority,
        deadline,
    }
    addTask(newTask)
    setTitle('')
    setDescription('')
    setCategory('Функция')
    setStatus('Предстоит сделать')
    setPriority('Средний')
    setDeadline('')
    setShowModal(false)
  }

  return (
    <div className="task-list-container">
        <div className="task-list-header">
            <h2>Задачи</h2>
            <button className='add-btn' onClick={()=>setShowModal(true)}>Добавить задачу</button>
        </div>
        <div className='task-grid'>{tasks.map(task => (
        <TaskItem key={task.id} task={task} />))}
        </div>
        {showModal &&(
            <div className="modal-overlay">
                <div className="modal-content">
                    <h3>Новая задача</h3>
                    <form onSubmit={handleSubmit} className='modal-form'>
                      <input type="text" placeholder='Заголовок'value={title} onChange={e=> setTitle(e.target.value)} required />
                    <select value={category} onChange={e=>setCategory(e.target.value)}>
                        <option disabled hidden value="">Выберите категорию</option>
                        <option>Ошибка</option>
                        <option>Функция</option>
                        <option>Документация</option>
                        <option>Рефакторинг</option>
                        <option>Тест</option>   
                    </select>
                      <select value={status} onChange={e => setStatus(e.target.value)}>
                        <option>Предстоит сделать</option>
                        <option>В процессе</option>
                        <option>Готово</option>
              </select>
              <select value={priority} onChange={e => setPriority(e.target.value)}>
                        <option disabled hidden value="">Выберите приоритет</option>
                        <option>Низкий</option>
                        <option>Средний</option>
                        <option>Высокий</option>
              </select>
              <input
                type="date" value={deadline} min={new Date().toISOString().split('T')[0]}  onChange={e => setDeadline(e.target.value)} required />
              <div className="modal-buttons">
                        <button type="submit">Создать</button>
                        <button type="button" onClick={() => setShowModal(false)}>Отмена</button>
              </div>  
            </form>
            </div>
        </div>
        )}
    </div>
  )
}

export default TaskList