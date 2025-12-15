import classes from "./EditForm.module.css"
import { useEffect, useState } from "react"
import Input from "../pages/Input.jsx"
import { useNavigate } from "react-router-dom";
//EditForm recieves task as a prop task
export default function EditForm({task}){
const token = localStorage.getItem('token');
const [taskInput, setTaskInput]= useState({
  title: task?.title || "",
  description: task?.description || "",
  status: task?.status || "",
  assignedTo: task?.assignedTo || "",
  dueDate: task?.dueDate?.split("T")[0]?.dueDate || ""
  
});
const navigate = useNavigate();
const [users, setUsers]= useState([])
 const [loading, setLoading]= useState(false)
 
 let id = task._id;
    useEffect(()=>{
            setTaskInput(task)
    }, [task])
  useEffect(()=>{
  async function fetchUsers(){
      try{
            const response = await fetch('http://localhost:3000/api/users', {
         headers: {
                 "authorization": `Bearer ${token}`
            }
      })
      if(!response.ok){
        console.log("Error message: ", response.status);
      }
        const userData =await response.json();
        setUsers(userData);
      }catch(error){
        console.log("Something went wrong!")
      }

    }
    fetchUsers();
  }, [])
  console.log("Users in EditForm that comes from backend: ", users);
        function handleOnChange(event, identifier){

        let value = event.target.value;  
        if(identifier === 'dueDate'){
            const isoDate = value.split("T")[0]; // "2025-12-26"
            const [year, month, day] = isoDate.split("-");
            value = `${year}-${month}-${day}`;
    }

        setTaskInput((prev)=>{
            return {
                ...prev,
                [identifier]: value
            }
        })
    }
 
        async function handleEditSubmit(e){
         e.preventDefault();   
        setLoading(true);
     
          const task={
            title:taskInput.title,
            description: taskInput.description,
            status: taskInput.status,
            assignedTo:taskInput.assignedTo,
            dueDate: taskInput.dueDate
     }
      try{
             const response = await fetch(`http://localhost:3000/api/tasks/update/${id}`,{
                method: "PUT",
                headers:{
                "Content-Type": "application/json",
                "authorization":(token)? `Bearer ${token}`: " "
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

      setLoading(false)
    }

    return <form onSubmit={(e)=>handleEditSubmit(e)} method="PUT">
    
  <div className={classes.formWrapper}>
       <Input 
        type= "text" 
        id="title"   
        name="title" 
        label="Title"
        value={taskInput.title}
        onChange={(event)=>handleOnChange(event, "title")}
     />
         <Input 
        type= "text" 
        id="description"   
        name="description" 
        label="Description"
        value={taskInput.description}
        onChange={(event)=>handleOnChange(event, 'description')}
    />  
        <label htmlFor='status'>Status</label>
        <select
            className={classes.selectBox}
            id="status"
            name="status"
            value={taskInput.status}
            onChange={(event)=>handleOnChange(event, 'status')}
          >
            <option value="todo">Todo</option>
            <option value='inprogress'>InProgress</option>
            <option value='complete'>Complete</option>
            <option value='pending'>Pending</option>
        </select>

         <select
            name="assignedTo"
            value={taskInput.assignedTo}
            onChange={(event)=>handleOnChange(event, "assignedTo")}
         >
            <option value=""> ---Select User---</option>

                {users.map((user)=>(<option key={user._id} value={user._id}>{user.name}</option>))}
           
         </select>
        
         <Input 
        type= "date" 
        id="dueDate" 
        name="dueDate" 
        label="DueDate"
        value={taskInput.dueDate}
        onChange={(event)=>handleOnChange(event, 'dueDate')}
    />
    <div className="formCard">
        <button className= {classes.btn} type="submit">{(loading)?"Submitting...": "Submit"}</button>
    </div>
    
  </div>
    
</form>
}