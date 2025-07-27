import { useState } from 'react'
import { useAppDispatch } from '../../shared/lib/hooks' 
import { createTask } from '../../entities/task/model/taskSlice'
import type { TaskCategory, TaskPriority, TaskStatus } from '../../shared/types'
import '../../shared/styles/TaskForm.css'
import{taskCategoryOptions, taskStatusOptions, taskPriorityOptions} from '../../widgets/option-list/options'
import type { TaskFormProps } from '../../shared/types/index'


const TaskForm = ({onClose}:TaskFormProps) => {
    const dispatch = useAppDispatch()
    const[title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const[category, setCategory] = useState('')
    const [status, setStatus] = useState('Предстоит сделать')
    const [priority, setPriority] = useState('')
    const [deadline, setDeadline] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    
    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault()
        setError(null)
        if (!category) {
        setError('Выберите категорию')
      return}
        if (!priority) {
        setError('Выберите приоритет')
        return}
    setLoading(true)
    try {
      await dispatch(createTask({
        title,
        description,
       category: category as TaskCategory,
       status: status as TaskStatus,
       priority: priority as TaskPriority,
        deadline,
      })).unwrap()

      onClose()
    } catch (e) {
      setError('Ошибка при добавлении задачи')
    } finally {
      setLoading(false)
    }
  }
    return(
    <div className="modal-overlay">
        <div className="modal-content">
            <h3>Новая задача</h3>
            <form onSubmit={handleSubmit} className='modal-form'>
                <input type="text" placeholder='Заголовок' value={title} onChange={e=> setTitle(e.target.value)} required disabled ={loading}/>
                <textarea placeholder='Описание (необязательно)' value={description} onChange={e=> setDescription(e.target.value)} disabled ={loading}></textarea>
                <select value={category} onChange={e=> setCategory(e.target.value)} disabled ={loading}>
                    <option disabled ={loading} value="">Выберите категорию
                    </option>{taskCategoryOptions}
                    </select>
                    <select disabled ={loading} value={status} onChange={e => setStatus(e.target.value)}>{taskStatusOptions}</select>
                    <select value={priority} onChange={e => setPriority(e.target.value)}>
                        <option disabled ={loading} value="">Выберите приоритет</option>{taskPriorityOptions}</select>
                <input type="date" value={deadline} min={new Date().toISOString().split('T')[0]}onChange={e => setDeadline(e.target.value)} disabled ={loading} required/>
                 {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="modal-buttons">
                    <button type="submit" disabled ={loading}> {loading ? 'Сохраняю...' : 'Сохранить'}</button>
                    <button disabled={loading} type="button" onClick={onClose}>Отмена</button>
                </div>
                
            </form>
        </div>
    </div>
)
}


export default TaskForm