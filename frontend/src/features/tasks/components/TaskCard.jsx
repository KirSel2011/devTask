 
 import classes from "./TaskCard.module.css"
 import { useState } from "react";
 import {deleteTask } from "../taskService"
 //import EditForm from "../features/profile/components/EditForm.jsx";

 import EditForm from "./EditForm"

 
  function TaskCard({task, onDelete}){
    const [loading, setLoading]= useState(false)
    const [edit, setEdit]= useState(false);
    const token = localStorage.getItem('token');
    const statusClasses={
    inprogress: classes.inprogress,
    complete: classes.complete,
    todo: classes.todo,
    pending: classes.pending
   };

   let id = task._id;
   console.log("------------task in taskCard:----------------- ", task);
   console.log("------------taskCard task._id:----------------- ", id);
   let badgeStyle = statusClasses[task.status?.toLowerCase()|| ""]

    async function handleDeleteTask(id){
      //console.log("Task deleted id in handleDeleteTask in TaskCard id: ", id)
        setLoading(true)
            try{
            const data = await deleteTask(token, id);
           // console.log("Delete Task message repsonse from backend: ", data.message)
          if(onDelete) onDelete(id);
            
        }catch(error){
            console.log("Something went wrong: ")
        }
        setLoading(false);  
    }

     async function handleEditTask(){
        setEdit(true);

     /*    setLoading(true);
        setEdit(true)
      try{
             const response = await fetch('http://localhost:3000/api/tasks/edit/${id}',{
                method: "PUT",
                headers:{
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(task)
            
        })
        if(!response.ok){
            console.log("resources not found in the server: ",response.status);
        }

        const data = response.json();
        console.log("Edit component message returned from backend: ",data.message);
      }catch(error){
        console.log("Something went wrong during submission the task!")
      }
      setLoading(false) */
    } 
    // console.log("--------------Token extracted from local Storage in FrontEnd TaskCard 'Inside': ", token)
    return <>
        {(edit)? <EditForm task= {task} setEditChange= {setEdit} />: 
        <article className={classes.card}>
        <div className={classes.cardHeader}>
            <p className={classes.titleHeader}>{(task.title)  || "untitled"}</p>
            <span className={`${classes.status} ${badgeStyle} ` }>{task.status || 'Unknown'}</span>
        </div>
        <div className={classes.cardBody}>
            <p>{task.description}</p>
            <div className={classes.assignment}>
                <p><strong>assignedTo:</strong>{task.assignedTo?.name ||'Unassigned'} </p>
                <p><strong>createdBy:</strong>{task.createdBy?.name || 'Unknown'}</p>
            </div>
        </div>
        <footer className={classes.cardFooter}>
            <p><strong>DueDate:</strong>{(task.dueDate)? new Date(task.dueDate)?.toLocaleDateString(): 'N/A'}</p>
            <button>viewDetail</button>
        </footer>
        <div className={classes.actions}>
          <button className={classes.viewBtn}>View</button>
          <button onClick = {()=>handleEditTask(id)}className={classes.editBtn}>Edit</button>
          <button onClick={()=>handleDeleteTask(id)} className={classes.deleteBtn}>{(loading)?"Deleting...":"Delete"}</button>
          
        </div>
    </article>}
    </>
}

export default TaskCard;