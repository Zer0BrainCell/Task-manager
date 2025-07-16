import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import type { TaskCategory, TaskPriority, TaskStatus } from "../types"; 
import{taskCategoryOptions, taskStatusOptions, taskPriorityOptions} from './option-list/options'
import './TaskDetails.css'

const TaskDetails = ()=>{
const {id} = useParams()
const navigate = useNavigate()
const{tasks, updateTask} = useTasks()
const task = tasks.find(t=>t.id ===id)
if(!task) return <div>Задача не найдена</div>
const [title, setTitle] = useState(task.title)
const [description, setDescription] = useState(task.description||'')
const [category, setCategory] = useState<TaskCategory>(task.category)
const [status, setStatus] = useState<TaskStatus>(task.status)
const [priority, setPriority] = useState<TaskPriority>(task.priority)
const [deadline, setDeadline] = useState(task.deadline || '')



const handleSave = () => {
 updateTask({
    id: task.id,
    title,
    description,
    category,
    status,
    priority,
    deadline,
    })
    navigate('/')
  }
  const handleCancel = () => {
    navigate('/')
  }
return(
    <div className="task-details-container">
        <h2>Редактирование задачи</h2>
        <div className="form-group">
            <label>Заголовок</label>
            <input type="text" value={title}
            onChange={e=>setTitle(e.target.value)}/>
        </div>
        <div className="form-group">
            <label>Описание</label>
            <textarea value={description}
            onChange={e=>setDescription(e.target.value)}/>
        </div>
        <div className="form-group">
            <label>Категория</label>
            <select value={category} onChange={e=>setCategory(e.target.value as TaskCategory)}>
                {taskCategoryOptions}
            </select>
        </div>
        <div className="form-group">
            <label>Статус</label>
            <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)}>
                {taskStatusOptions}
            </select>
        </div>
        <div className="form-group">
            <label>Приоритет</label>
            <select value = {priority} onChange={e=>setPriority(e.target.value as TaskPriority)}>
                {taskPriorityOptions}
            </select>
        </div>
        <div className="form-group">
            <label>Срок выполнения</label>
            <input type="date"value={deadline}onChange={e => setDeadline(e.target.value)}/>
            </div>
        <div className="button-group">
            <button className="save btn" onClick={handleSave}>Сохранить</button>
            <button className="cancel-btn" onClick={handleCancel}>Отмена</button>
        </div>
    </div>
)
}
export default TaskDetails