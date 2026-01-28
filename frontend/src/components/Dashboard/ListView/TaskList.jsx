import TaskRow from "./TaskRow";
import classes from "./TaskList.module.css";

export default function TaskList({ tasks, onDelete, onEdit }) {
  return (
    <div className={classes.tasklistWrapper}>
      <table className={classes.table}>
        <thead className={classes.tableHeader}>
          <tr className={classes.taskrow}>
            <th>Title</th>
            <th className={classes.colDescription}>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th className={classes.colAssigned}>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={classes.tableBody}>
          {tasks.length === 0 && (
            <tr>
              <td
                colSpan="6"
                className={`${classes.empty} ${classes.colDescription} ${classes.colAssigned}`}
              >
                No tasks available
              </td>
            </tr>
          )}
          {tasks?.map((task) => (
            <TaskRow key={task._id} task={task} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
