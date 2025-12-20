import classes from "./TaskRow.module.css"
export default function TaskRow({task, onDelete}){

    console.log("Dashboard: TaskRow incoming tasks from taskList: ", task);
 return <tr key = {task._id} className={classes.taskrow}>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{task.status}</td>
        <td>{task.dueDate.split('T')[0]}</td>
        <td>{task.assignedTo?.name || "Unassigned"}</td>
        <td className={classes.listBtnWrapper}>
            <button className={classes.editBtn}>Edit</button>
            <button className={classes.deleteBtn} onClick={()=>onDelete(task._id)}>Delete</button>
        </td>
 </tr>
}