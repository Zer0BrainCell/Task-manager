import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks'
import { updateTask } from '../../../entities/task/model/taskSlice'
import type { TaskCategory, TaskPriority, TaskStatus } from '../../../shared/types'
import { useState, useEffect } from 'react'
import{taskCategoryOptions, taskStatusOptions, taskPriorityOptions} from '../../../widgets/option-list/options'
import './TaskDetails.css'
const TaskDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const task = useAppSelector(state => state.task.tasks.find(t => t.id === id))
    if (!task) {
        return <div>Задача не найдена</div>
    }
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState(task.description ?? '')
  const [category, setCategory] = useState<TaskCategory>('Ошибка')
  const [status, setStatus] = useState<TaskStatus>('Предстоит сделать')
  const [priority, setPriority] = useState<TaskPriority>('Низкий')
  const [deadline, setDeadline] = useState(task.deadline ?? '')
  
  useEffect(()=>{
    if(task){
        setTitle(task.title)
        setDescription(task.description ?? '')
        setCategory(task.category)
        setStatus(task.status)
        setPriority(task.priority)
        setDeadline(task.deadline ?? '')        
    }
}, [task])
 const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault()
    dispatch(updateTask({
      id: task.id,
      title,
      description,
      category,
      status,
      priority,
      deadline        
    }))   
    navigate('/')
 }

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
      <button className="cancel-btn" onClick={() => navigate('/')}>Отмена</button>
      </div>
    </form>
    </div>
  )}
  export default TaskDetails