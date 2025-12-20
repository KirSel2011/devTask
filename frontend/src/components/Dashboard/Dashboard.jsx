import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import KanbanBoard from "./KanbanView/kanbanBoard.jsx"
import TaskList from "./ListView/TaskList.jsx"
import classes from "./Dashboard.module.css"
import FilterBar from "./FilterBar.jsx"
export default function dashboard(){
    const [viewStatus, setViewStatus]= useState("listView")
    const [tasks, setTasks]= useState([]);

     // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
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
  return [...new Set(tasks.map(t => t.assignedTo))];
}, [tasks]);
 //updateTask = {handleUpdateTask}
function handleUpdateTask(id, newStatus){
    setTasks(prev=> prev.map(t=>t.id === id?{...t, status:newStatus}: t))
};
    return (
        <div >

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

            {(viewStatus === "listView") && <TaskList  tasks ={filteredTasks}/> }
            {(viewStatus === "kanbanView") && <KanbanBoard  tasks ={filteredTasks} /> }

        </div>
    )
}