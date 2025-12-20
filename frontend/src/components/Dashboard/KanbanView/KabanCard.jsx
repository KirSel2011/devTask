import classes from "./kabanCard.module.css"
export default function KanbanCard({task, onDelete}){
    //className ={classes.kanban-card}
    return <div   style={{
        padding: "10px",
        margin: "10px 0",
        background: "#fff",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }} >
                <strong>Title: {task.title}</strong>
                <p>Description: {task.description}</p>
                <p>Status: {task.status}</p>
                <p>AssignedTo: {task.assignedTo?.name  || "UnassignedTo"}</p>
                <p>Due: {task.dueDate.split("T")[0]}</p>

                 <div className={classes.listBtnWrapper}>
                            <button className={classes.editBtn}>Edit</button>
                            <button className={classes.deleteBtn} onClick = {()=>onDelete(task._id)}>Delete</button>
                  </div>
        </div>
}