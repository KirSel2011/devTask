
import classes from "./KanbanBoard.module.css"
const column = ["todo", "inprogress", "pending", "complete"]
import KanbanColumn from "./KanbanColumn"

export default function KanbanBoard({tasks, onDelete, onEdit}){

return <div className={classes.board}>
       {column.map((col)=><KanbanColumn 
        key={col}
        status={col}
        tasks = {tasks.filter((t)=>t.status === col)}
        onDelete={onDelete}
        onEdit={onEdit}
        //updateTask = {updateTask}
       
       />)}
        
</div>
}