
import TaskCard from "./TaskCard";
import classes from "./TaskList.module.css"
import { useState, useEffect } from "react";
export default function TaskList({tasksData}){
 const [tasks, setTasks]= useState([])

 useEffect(()=>{
    setTasks(tasksData)
 },[tasksData])
     console.log("Tasks in TaskList----------: ", tasksData)
 console.log("What are the tasks comes from useState in Tasks: ", tasks);
     async function handleDeleteTask(id){
        const confirm = window.confirm("Are you sure you delete this task?");
        if(!confirm){
            return;
        }
        setTasks(prev=>prev.filter(task=> task._id !== id));
       }
   console.log("TaskList ids of each task: ", tasks)
    return <div className={classes.cardContainer}>
        {
        (tasks.length === 0)? (<p>No Tasks available</p>):
        (tasks.map(task=>( 
            
            <TaskCard 
                key={task._id} 
                task={task} 
                onDelete ={handleDeleteTask} 
            />
        )))} 

    </div>
}