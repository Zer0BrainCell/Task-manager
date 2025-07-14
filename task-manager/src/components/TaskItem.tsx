import { Link } from 'react-router-dom'
import type { Task } from '../types'
import { useTasks } from '../context/TaskContext'
import './TaskItem.css'

type Props = {
  task: Task
}

const TaskItem = ({ task }: Props) => {
  const { removeTask } = useTasks()

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
        <button className="delete-btn" onClick={() => {
          if (confirm('Удалить эту задачу?')) removeTask(task.id)
        }}>Удалить</button>
      </div>
    </div>
  )
}

export default TaskItem
