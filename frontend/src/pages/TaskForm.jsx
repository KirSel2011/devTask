import Input from "./Input.jsx"
import { useState, useEffect } from "react";
import classes from "./TaskForm.module.css"
import {useNavigate } from "react-router-dom"
 //const token = localStorage.getItem('token');
/// console.log("--------------Token extracted from local Storage in FrontEnd TaskFormPage 'outside': ", token);
 export default function TaskInput(){
    const [taskInput, setTaskInput]= useState({
        title: "",
        description: "",
        status: "todo",
        assignedTo: "",
        dueDate: "10/10/2025"
    });

    const [users, setUsers]= useState([]);
    const [taskId, setTaskId]= useState()
    const navigate = useNavigate();
      useEffect(()=>{
        async function fetchUsers(){
            console.log("Frontend before try fetch users")
           try{
             const response = await fetch("http://localhost:3000/api/users", {
                headers: {
                     "authorization":`Bearer ${localStorage.getItem('token')}`
              
                }
             });
             console.log("Frontend before inside try fetch users")
             if(!response.ok){
                console.log("users not found", response.status)
                return;
             }
             const usersData = await response.json();
             console.log("Frontend before try fetch users", usersData)
             setUsers(usersData)
           }catch(error){
               console.log("something went wrong: ", error);
           }
        }
        fetchUsers();
     }, [])
     // console.log("--------------Token extracted from local Storage in FrontEnd TaskFormPage 'insideComp': ", token);
    function handleOnChange(event, identifier){
        let value = event.target.value;  
        if(identifier === 'dueDate'){
      /*      const isoDate= value.split("T")[0];
        value = isoDate; */

          const isoDate = value.split("T")[0]; // "2025-12-26"
    const [year, month, day] = isoDate.split("-");
    value = `${year}-${month}-${day}`;
         /*   let [year, month, day]= isoDate.split("-");
           console.log("handleOnChange day: ", day);
            console.log("handleOnChange month: ", month);
             console.log("handleOnChange year: ", year);
           value = (year + "/" + month +"/"+ day)
           console.log("TaskForm dueDate read by handleOnchange: ", value) */
          
        }
       
        console.log("What is the value of date outside if clause: ", value)
        setTaskInput((prev)=>{
            return {
                ...prev,
                [identifier]: value
            }
        })
    }

    //handleSubmit wokrs fine
    function handleOnSubmit(e){
        e.preventDefault();
      /*   if(!taskInput.assignedTo){
            alert("Please select a valid name: ")
            return;
        }
        if(!taskInput.title){
            alert("Title is required");
            return;
        } */
     const task={
            title:taskInput.title,
            description: taskInput.description,
            status: taskInput.status,
            assignedTo:taskInput.assignedTo,
            dueDate: taskInput.dueDate
     }
       async function submission(){
         const response = await fetch('http://localhost:3000/api/tasks',{
            method: "POST",
            headers:{
                'Content-Type':'application/json',
                "authorization":`Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(task)
        });

        if(!response.ok){
            console.log("Server does not reponse! ");
            return;
        }if(response.status === 401){
            localStorage.removeItem('token');
            navigate('/login')
        }
       const data = await response.json();
      console.log("TaskForm in FrontEnd: ", data.message)
      console.log("TaskForm in Frontend returned from backend postTaskRout data.user: ", data.user);
       console.log("TaskForm in Frontend returned from backend postTaskRout data.user.id: ", data.user.id);
       console.log("What is status after each iteration in taskForm: ",taskInput.status);

  //navigate accurate id and works fine
 navigate(`/tasks/${data.user.id}`);
    }
    submission();
  
       }
    return <form onSubmit={(e)=>handleOnSubmit(e)} method="POST">
    
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
            value={taskInput.status}
            onChange={(event)=>handleOnChange(event, 'status')}
          >
            <option value="todo">Todo</option>
            <option value='inprogress'>InProgress</option>
            <option value='complete'>Complete</option>
            <option value='pending'>Pending</option>
        </select>

         <select
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
        <button className= {classes.btn} type="submit">Create Task</button>
    </div>
    
  </div>
    
</form>
 }
