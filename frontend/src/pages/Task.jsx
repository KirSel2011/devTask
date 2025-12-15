import classes from "./Task.module.css"
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import TaskList from "../components/TaskList.jsx"
import { useNavigate } from "react-router-dom";
 export default function Task(){
    const [taskData, setTaskData]= useState([])
    //const {id} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(()=>{
        async function getTask(){
            
            if(!token) return;
            //const response = await fetch(`http://localhost:3000/api/tasks/${id}`
            const response = await fetch(`http://localhost:3000/api/tasks`,{
            headers:{
                'authorization': `Bearer ${token}`
                // 'id'           :`${id}`
                //'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        });
        if(!response.ok){
            //throw new Error({message:`resources not found: ${response.status}`})
            console.log("Resources not found")
        }if(response.status === 401){
            localStorage.removeItem('token');
            navigate("/login")
            return;
        }
       const data = await response.json();
       setTaskData(data)
       console.log("******************************************************************")
       console.log("frontEnd Debug Checkup: postTask returned from backend: ", data);
      
    //navigate(`/tasks/${data.id}`);
    }
    getTask();
    }, [])

    console.log("Task data in Task Component: ", taskData);
    return <div>
        <TaskList tasksData = {taskData}/>
    </div>
}