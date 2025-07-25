import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../../entities/task/model/taskSlice'
import type { TaskCategory, TaskPriority, TaskStatus } from '../../shared/types'
import '../../shared/styles/TaskForm.css'
import{taskCategoryOptions, taskStatusOptions, taskPriorityOptions} from '../../widgets/option-list/options'
import type { TaskFormProps } from '../../shared/types/index'


const TaskForm = ({onClose}:TaskFormProps) => {
    const dispatch = useDispatch()
    const[title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const[category, setCategory] = useState('')
    const [status, setStatus] = useState('Предстоит сделать')
    const [priority, setPriority] = useState('')
    const [deadline, setDeadline] = useState('')
    
    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault()

    dispatch(addTask({
       id: Date.now().toString(),
       title,
       description,
       category: category as TaskCategory,
       status: status as TaskStatus,
       priority: priority as TaskPriority,
       deadline
    }))
    onClose()
}
    return(
    <div className="modal-overlay">
        <div className="modal-content">
            <h3>Новая задача</h3>
            <form onSubmit={handleSubmit} className='modal-form'>
                <input type="text" placeholder='Заголовок' value={title} onChange={e=> setTitle(e.target.value)} required />
                <textarea placeholder='Описание (необязательно)' value={description} onChange={e=> setDescription(e.target.value)}></textarea>
                <select value={category} onChange={e=> setCategory(e.target.value)}>
                    <option disabled hidden value="">Выберите категорию
                    </option>{taskCategoryOptions}
                    </select>
                    <select value={status} onChange={e => setStatus(e.target.value)}>{taskStatusOptions}</select>
                    <select value={priority} onChange={e => setPriority(e.target.value)}>
                        <option disabled hidden value="">Выберите приоритет</option>{taskPriorityOptions}</select>
                <input type="date" value={deadline} min={new Date().toISOString().split('T')[0]}onChange={e => setDeadline(e.target.value)} required/>
                <div className="modal-buttons">
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={onClose}>Отмена</button>
                </div>
                
            </form>
        </div>
    </div>
)
}


export default TaskForm