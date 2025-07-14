import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import type { TaskCategory, TaskPriority, TaskStatus, Task } from "../types"; 

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
    ...task,
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
            <option>Баг</option>
            <option>Функция</option>
            <option>Документация</option>
            <option>Рефакторинг</option>
            <option>Тест</option>
            </select>
        </div>
        <div className="form-group">
            <label>Статус</label>
            <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)}>
            <option>Предстоит сделать</option>
            <option>В процессе</option>
            <option>Готово</option>
            </select>
        </div>
        <div className="form-group">
            <label>Приоритет</label>
            <select>
                <option>Низкий</option>
                <option>Средний</option>
                <option>Высокий</option>
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