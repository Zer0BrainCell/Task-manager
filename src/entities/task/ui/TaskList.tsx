import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import TaskItem from "./TaskItem";
import { Empty } from "antd";
import TaskForm from "../../../features/ui/TaskForm";
import './TaskList.css'

const TaskList = ()=>{
  const tasks = useSelector((state: RootState)=> state.task.tasks)
  const [showModal, setShowModal] = useState(false)
return(
  <div className="task-list-container">
    <div className="task-list-header">
      <h2>Задачи</h2>
     <button className="add-btn" onClick={()=> setShowModal(true)}>Добавить задачу</button>
    </div>
    <div className="task-grid">
      {tasks.length > 0
          ? tasks.map(task => <TaskItem key={task.id} task={task} />)
          : <Empty description="Пока что нет задач"/>
        }
    </div>
    {showModal && <TaskForm onClose={()=> setShowModal(false)}/>}
  </div>
)
}
export default TaskList