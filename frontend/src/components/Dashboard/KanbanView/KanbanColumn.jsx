
import KabanCard from "./KabanCard"
import classes from "./KanbanColumn.module.css"
export default function KanbanColumn({status, tasks, onDelete, onEdit}){
   
    return (
        <div className={classes.kanbanColumnWrapper}>
            <h2 className={classes.columnTitle}>{status.toUpperCase()}</h2>
            {tasks.length ===0 && <p className={classes.empty}>No Tasks available</p>}
            {tasks.map((task)=>(
                <KabanCard key={task._id} task = {task}  onDelete= {onDelete} onEdit={onEdit}/>
            )
        )}
    </div>)
}