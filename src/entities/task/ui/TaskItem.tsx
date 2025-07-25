import { Link } from 'react-router-dom'
import type { Task } from '../../../shared/types'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../model/taskSlice'
import './TaskItem.css'

type Props = {
  task: Task
}

const TaskItem = ({ task }: Props) => {
  const dispatch = useDispatch()
  const handleDelete = ()=>{
    if(confirm('Удалить эту задачу?')){
      dispatch(deleteTask(task.id))
    }
  }

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className="task-deadline">до {task.deadline}</span>
      </div>

      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="task-tags">
        <span className={`chip ${task.category.toLowerCase()}`}>{task.category}</span>
        <span className={`chip ${task.status.toLowerCase()}`}>{task.status}</span>
        <span className={`chip ${task.priority.toLowerCase()}`}>{task.priority}</span>
      </div>

      <div className="task-actions">
        <Link to={`/task/${task.id}`} className="edit-btn">Редактировать</Link>
        <button className="delete-btn" onClick={() => handleDelete()}>Удалить</button>
      </div>
    </div>
  )
}

export default TaskItem
