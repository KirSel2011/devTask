import classes from "./EditForm.module.css"
import { useEffect, useState } from "react"
import Input from "../../../pages/Input.jsx"
import { useNavigate } from "react-router-dom";
//EditForm recieves task as a prop task
export default function EditForm({task}){
const token = localStorage.getItem('token');

const [taskInput, setTaskInput]= useState({
  firstName: task.firstName || "",
  lastName: task.lastName || "",
  role: task.role || "developer",
  bio: task.bio || "",
  joinDate: task.joinDate.split("T")[0].joinDate || ""
  
});

console.log("Profile Edit form frontend page: ", task)
const [isEditing, setIsEditing]= useState(false);
const navigate = useNavigate();
 const [loading, setLoading]= useState(false)
 // we use task id to access the profile to update
 let id = task.id;
 console.log("**What is the task id in EditForm for Profile:*** ", task.id)
    useEffect(()=>{
            setTaskInput(task)
            setIsEditing(true);
    }, [task])
 
  console.log("Profile in EditForm id: ", task.id);
        function handleOnChange(event, identifier){

        let value = event.target.value;  
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
            firstName:taskInput.firstName,
            lastName: taskInput.lastName,
            role: taskInput.role,
            bio:taskInput.bio,
     }
      try{
             const response = await fetch(`http://localhost:3000/api/profile/update/${id}`,{
                method: "PUT",
                headers:{
                "Content-Type": "application/json",
                "authorization":`Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(task)
        })
        if(!response.ok){
            console.log("resources not found in the server: ",response.status);
        }
        const data = await response.json();
        console.log("Edit component message returned from backend: ",data.message);
      }catch(error){
        console.log("Something went wrong during submission the profile!")
      }

      setLoading(false)
      navigate('/profile')
    }

    return <form onSubmit={(e)=>handleEditSubmit(e)} method="PUT">
    <div className={classes.formWrapper}>
        <Input 
            type= "text" 
            id='firstName'   
            name="firstName" 
            label="FirstName"
            value={taskInput.firstName}
            onChange={(event)=>handleOnChange(event, 'firstName')}
        />  
        <Input 
            type= "text" 
            id='lastName'   
            name="lastName" 
            label="LastName"
            value={taskInput.lastName}
            onChange={(event)=>handleOnChange(event, 'lastName')}
        /> 
      
         <Input 
            type= "text" 
            id='bio'   
            name="bio" 
            label="Bio"
            value={taskInput.bio}
            onChange={(event)=>handleOnChange(event, 'bio')}
        />  
        <label htmlFor='role'>Role</label>
        <select 
            className={classes.selectBox}
            id="role"
            name="role"
            value={taskInput.role}
            onChange={(event)=>handleOnChange(event, 'role')}
          >
            <option value="developer">Developer</option>
            <option value='admin'>Admin</option>
            <option value='manager'>Manager</option>
            
        </select>
        <Input 
            type= "date" 
            id="joinDate" 
            name="joinDate" 
            label="JoinDate"
            value={task.joinDate ? task.joinDate.split("T")[0] : ""}
            readOnly
        />
    <div className="formCard">
        <button className= {classes.btn} type="submit">{(loading)?"Submitting...": "Submit"}</button>
    </div>
  </div>   
</form>
}