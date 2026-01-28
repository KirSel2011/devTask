import classes from "./TaskRow.module.css"
import { useState } from "react";
import EditForm from "../EditForm";
export default function TaskRow({task, onDelete, onEdit}){
  const [editing, setEditing]= useState(false);
  const [update, setUpdate]= useState({})
    console.log("Dashboard: TaskRow incoming tasks from taskList: ", task);
    console.log("Dashboard: TaskRow incoming tasks from taskList taskId: ", task._id);
 return <tr key = {task._id} className={classes.taskrow}>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{task.status}</td>
        <td>{task.dueDate.split('T')[0]}</td>
        <td>{task.assignedTo?.name || "Unassigned"}</td>
        <td className={`${classes.listBtnWrapper} ${classes.actionCell}`}>
            <button className={classes.editBtn} onClick={()=>onEdit(task)}>Edit</button>
            <button className={classes.deleteBtn} onClick={()=>{
                                            if(!window.confirm("Are you sure!")) return;
                                            onDelete(task._id)
                            }}>
                                Delete
                            </button>
        </td>
 </tr> 
 
}