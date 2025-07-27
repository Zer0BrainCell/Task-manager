import {useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { fetchTasks } from "../model/taskSlice";
import type { RootState } from "../../../app/store";
import TaskItem from "./TaskItem";
import { Empty } from "antd";
import TaskForm from "../../../features/ui/TaskForm";
import './TaskList.css'
console.log('API baseURL:', import.meta.env.VITE_API_URL)
const TaskList = ()=>{
  const dispatch = useAppDispatch()
  const tasks = useSelector((state: RootState)=> state.task.tasks)
  const [showModal, setShowModal] = useState(false)

useEffect(()=>{
  dispatch(fetchTasks())
}, [dispatch])

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