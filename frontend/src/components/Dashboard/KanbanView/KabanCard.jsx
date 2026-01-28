import classes from "./kabanCard.module.css"
import { useNavigate } from "react-router-dom";
export default function KanbanCard({task, onDelete, onEdit}){
  const navigate = useNavigate();
      async function handleView(id){
        navigate(`/tasks/${id}`)
    }
    return <div className={classes.taskDescription} >
         <strong>Title: {task.title}</strong>
         <p>Description: {task.description}</p>
          {!task.status? <p>Status: {task.status}</p>:''}
          <p>AssignedTo: {task.assignedTo?.name  || "UnassignedTo"}</p>
          <p>Due: {task.dueDate.split("T")[0]}</p>
             
        <div className={classes.actions}>
          <button className={classes.viewBtn} onClick={()=>handleView(task._id)} >View Details</button>
          
          <button onClick = {()=>onEdit(task)}className={classes.editBtn}>Edit</button>
          <button onClick= {() => {
                                  if (!window.confirm("Are you sure?")) return;
                              onDelete(task._id)
                             }} className={classes.deleteBtn}>Delete</button>
          
        </div>  
</div>
    
}

