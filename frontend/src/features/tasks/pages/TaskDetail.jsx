import classes from "./Task.module.css"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import TaskList from "../components/TaskList.jsx"
import { useNavigate } from "react-router-dom";
import { fetchDetailTask } from "../taskService.js";
 export default function TaskDetail(){
    const [task, setTask]= useState([])
    const {id} = useParams();
    console.log("Task detail id is displayed here: ", id);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(()=>{
        async function getTask(){
            
            if(!token) return;
            const task= await fetchDetailTask(id);
           setTask(data)
       console.log("******************************************************************")
       console.log("frontEnd Debug Checkup: postTask returned from backend: ", data);
      
    //navigate(`/tasks/${data.id}`);
    }
    getTask();
    }, [])

    console.log("Task data in Task Component: ", taskData);
    return <article className={classes.card}>
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
         {/*    <div className={classes.actions}>
              <button className={classes.viewBtn}>View</button>
              <button onClick = {()=>handleEditTask(id)}className={classes.editBtn}>Edit</button>
              <button onClick={()=>handleDeleteTask(id)} className={classes.deleteBtn}>{(loading)?"Deleting...":"Delete"}</button>
              
            </div> */}
        </article>
}