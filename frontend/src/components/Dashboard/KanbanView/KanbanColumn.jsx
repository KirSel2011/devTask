
import KabanCard from "./KabanCard"
import { useEffect, useState } from "react"
export default function KanbanColumn({status, tasks}){
    // const data = await deleteTask(localStorage.getItem('token'), id)

    const [userTasks, setUserTasks]= useState([]);
    useEffect(()=>{
           setUserTasks(tasks);
    }, [])
    
    function handleDelete(id){
           setUserTasks((prev)=> prev.filter((task)=> task._id !== id))
    }
    return (
        <div className="kaban-column"  style={{
      width: "300px",
      padding: "10px",
      background: "#f2f2f2",
      borderRadius: "8px"
    }}>
            <h2>{status.toUpperCase()}</h2>
            {userTasks.map((task)=>(
                <KabanCard key={task._id} task = {task}  onDelete= {handleDelete}/>
            )
        )}
    </div>)
}