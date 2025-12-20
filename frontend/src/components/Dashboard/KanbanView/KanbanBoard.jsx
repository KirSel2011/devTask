
const column = ["todo", "inprogress", "pending", "complete"]
import KanbanColumn from "./KanbanColumn"

export default function KanbanBoard({tasks}){

return <div style={{ display: "flex", gap: "20px", alignItems: "flex-start"}}>
       {column.map((col)=><KanbanColumn 
        key={col}
        status={col}
        tasks = {tasks.filter((t)=>t.status === col)}
        //updateTask = {updateTask}
       
       />)}
        
</div>
}