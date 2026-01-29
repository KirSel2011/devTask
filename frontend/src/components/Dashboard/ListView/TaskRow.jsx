import classes from "./TaskRow.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditForm from "../EditForm";

export default function TaskRow({task, onDelete, onEdit, onAddNote}){
  const [editing, setEditing]= useState(false);
  const [update, setUpdate]= useState({})
  const navigate = useNavigate()
    console.log("Dashboard: TaskRow incoming tasks from taskList: ", task);
    console.log("Dashboard: TaskRow incoming tasks from taskList taskId: ", task._id);
  async function handleView(id){
        navigate(`/tasks/${id}`)
    }
   /*  function handleAddNotes(noteId){
      navigate(`/task/${noteId}/notes`)
    } */
 return <tr key = {task._id} className={classes.taskrow}>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{task.status}</td>
        <td>{task.dueDate.split('T')[0]}</td>
        <td>{task.assignedTo?.name || "Unassigned"}</td>
        <td className={`${classes.listBtnWrapper} ${classes.actionCell}`}>
            <button className={classes.editBtn} onClick={()=>onEdit(task)}>Edit</button>
            <button onClick={()=>handleView(task._id)}         className={classes.viewBtn}>View</button>
            <button className={classes.deleteBtn} onClick={()=>{
                                            if(!window.confirm("Are you sure!")) return;
                                            onDelete(task._id)
                            }}>
                                Delete111
                            </button>
            <button className={classes.addNoteBtn} onClick={()=>onAddNote(task)}>AddNotes/comments</button>
        </td>
 </tr> 
 
}