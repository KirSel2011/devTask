import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import KanbanBoard from "./KanbanView/kanbanBoard.jsx"
import TaskList from "./ListView/TaskList.jsx"
import classes from "./Dashboard.module.css"
import FilterBar from "./FilterBar.jsx"
import {deleteTask} from "./dashBoardApi.jsx"
import TaskEditModal from "./TaskEditModal.jsx"
//dasboard owns the taskdata and users, so it modifies the data
//only in dashboar(source truth)
export default function dashboard(){
    const [viewStatus, setViewStatus]= useState("listView")
    const [tasks, setTasks]= useState([]);
    const [usersTask, setUsersTask]= useState([])
     // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(()=>{
    const fetchTasks = async()=>{
        try{
            const response = await fetch("http://localhost:3000/api/tasks", {
                headers: {
                "authorization": `Bearer ${token}`
                }
            })
      if(!response.ok){
        throw new Error(`Error resource not found:, ${response.status}`);
      }if(response.status === 401){
        localStorage.removeItem(token);
        navigate('/login')
        return;
      }
      const data = await response.json();
      console.log("Data message indide dashBoard: ", data);
        setTasks(data);
        console.log("DashBoard return from backend: ",tasks)
    }catch(error){
      console.log("Dashboard fetch error: ", error)
    }
       
    }
    fetchTasks();
}, [navigate, token])

const filteredTasks = useMemo(()=>{
    let result =[...tasks];
//search
    if(search){
        result = result.filter((t)=> t.title.toLowerCase().includes(search.toLowerCase()));
        console.log("Result for Search: ", result)
    }
    if(statusFilter){
        result = result.filter((t)=>t.status === statusFilter)
           console.log("statusFilter result: ", result)
    }
    if(userFilter){
        result = result.filter(t=> t.assignedTo === userFilter)
    }
    result.sort((a,b) => sortAsc? new Date(a.dueDate) - new Date(b.dueDate): new Date(b.dueDate) - new Date(a.dueDate));
    return result;
}, [tasks,search, userFilter, statusFilter, sortAsc])

const users = useMemo(() => {
  const map = new Map();
  tasks.forEach(task=>{
    if(task.assignedTo?._id){
      map.set(task.assignedTo._id, task.assignedTo);
      console.log("useMemo(()) for task: ", task)
    }
  })
  return Array.from(map.values());
}, [tasks]);

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
        
        setUsersTask(userData);
      }catch(error){
        console.log("Something went wrong!")
      }

    }
    fetchUsers();
  }, [])
 //updateTask = {handleUpdateTask}
async function handleUpdateTask(id, task){  
if (!task || !task._id) {
  console.log("Task is missing _id!");
  return;
}

   try{
      const response =   await fetch(`http://localhost:3000/api/tasks/update/${id}`,{
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
         const savedTask=await response.json()
         console.log("***Returned Update Task from Backend: ****", savedTask)
         console.log("***Returned Update Task from frontEnd: ****", task)
         //update the task frontend
        setTasks(prev=> prev.map(t=>t._id === task._id?{...t, ...savedTask}: t))
        //close modal 
        setSelectedTask(null);
    // navigate("/dashboard")
   }catch(error){
      console.log("The task is not updated: ", error)
   }
     
};
function handleEditmodal(task){
  console.log("From HanldleEditmodal task: ", task)
  console.log("@top HandleEditModal is triggered! ")
  if (!task || !task._id) {
  console.log("Task is missing _id!");
  return;
}
 console.log("@bottom HandleEditModal is triggered! ")
  setSelectedTask(task);
}
//dashboard processes delete logic for both backend and frontend 
async function handleDeleteTask(id) {
   const prevTask = tasks;
  try{
        //update backend
        await deleteTask(localStorage.getItem('token'), id);
        //update frontend after successful update backend
        setTasks(prev => prev.filter(task => task._id !== id));
  }catch(error){
    setTasks(prevTask);   //rollback to prev task data
    console.error("Failed to delete tasks: ", error)
  }
  
}
    return <>{(selectedTask)?(
  <TaskEditModal
    users={usersTask || []}
    task={selectedTask}
    onClose={() => setSelectedTask(null)}
    onSave={handleUpdateTask}
  />
):(
        <div >
    <header className={classes.dashboardHeader}>
             <h1>Task Dashboard</h1>
            <p>View and manage tasks by assigned user</p>
  </header>
    <FilterBar
      search={search}
      setSearch={setSearch}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      userFilter={userFilter}
      setUserFilter={setUserFilter}
      sortAsc={sortAsc}
      setSortAsc={setSortAsc}
      users={users}
    />
            <div className={classes.btnWrapper}>
                <button className={classes.listBtn} onClick={()=>setViewStatus("listView")}>List View</button>
                <button className={classes.kanbanBtn} onClick={()=>setViewStatus("kanbanView")}>Kanban View</button>
            </div>

            {(viewStatus === "listView") && <TaskList  tasks ={filteredTasks} onDelete={handleDeleteTask} onEdit={handleEditmodal}/> }
            {(viewStatus === "kanbanView") && <KanbanBoard  tasks ={filteredTasks} onDelete={handleDeleteTask} onEdit={handleEditmodal} /> }

        </div>
    )} </>
}