import { useTasks } from '../context/TaskContext'
import TaskItem from '../components/TaskItem'
import { useState } from 'react'
import type { TaskCategory, TaskPriority, TaskStatus } from '../types'
import './TaskList.css'
import{taskCategoryOptions, taskStatusOptions, taskPriorityOptions} from './option-list/options'

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
                        <textarea placeholder="Описание (необязательно)"value={description}onChange={e => setDescription(e.target.value)}/>
                    <select value={category} onChange={e=>setCategory(e.target.value)}>
                        <option disabled hidden value="">Выберите категорию</option>
                        {taskCategoryOptions}
                    </select>
                      <select value={status} onChange={e => setStatus(e.target.value)}>
                      {taskStatusOptions}
              </select>
              <select value={priority} onChange={e => setPriority(e.target.value)}>
                        <option disabled hidden value="">Выберите приоритет</option>
                        {taskPriorityOptions}
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