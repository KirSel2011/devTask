import TaskRow from "./TaskRow"
import classes from "./TaskList.module.css"
import { useState, useEffect } from "react"
import { deleteTask } from "../dashBoardApi";
export default function TaskList({tasks}){
const [userTasks, setUserTasks]= useState([]);
/* function handleEdit(){
 console.log("HandleEdit on TaskList")
} */

 console.log("DashBoard: incoming from task in TaskList:",tasks);
 useEffect(()=>{
    setUserTasks(tasks)
 }, [tasks])
async function handleDelete(id){
    const data = await deleteTask(localStorage.getItem('token'), id)
    console.log("DeletedTask in Tasklist is : ", data);
    setUserTasks((prev)=> prev.filter(task => task._id !== id))
} 
return <div className={classes.tasklistWrapper}>
    <table  >
    <thead className={classes.tableHeader}>
        <tr>
           <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Assigned To</th>
          <th>Actions</th>
        </tr>
    </thead>
    <tbody>
         {userTasks?.map((task)=><TaskRow key={task._id} task = {task} onDelete={handleDelete} />)}    
    </tbody>
</table>
</div>
}