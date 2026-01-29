import { useState } from "react";
import PersonalTaskNote from "./components/PersonalTaskNote.jsx";
import TaskComments from "../comment/component/TaskComments.jsx"
import classes from "./TaskNotesModal.module.css";

export default function TaskNoteModal({ task, token, onClose, initialTab }) {
  const [activeTab, setActiveTab] = useState(initialTab || "comments");
  const isPastDue =
    new Date(task.dueDate) < new Date() && task.status !== "Done";

  return (
    <div className={classes.backdrop} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <button className={classes.closeBtn} onClick={onClose}>×</button>

        <div className={classes.header}>
          <h2 style={{ color: isPastDue ? "red" : "inherit" }}>
            {task.title} {isPastDue && "⚠ Past Due"}
          </h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Assigned To: {task.assignedTo?.name || "Unassigned"}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
        </div>

        {/* Tabs */}
        <div className={classes.section}>
          <button
            onClick={() => setActiveTab("comments")}
            disabled={activeTab === "comments"}
          >
            Comments
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            disabled={activeTab === "notes"}
          >
            Notes
          </button>
        </div>

        {/* Tab content */}
        <div className={classes.section}>
          {activeTab === "comments" && (
            <TaskComments taskId={task._id} token={token} />
          )}
          {activeTab === "notes" && <PersonalTaskNote taskId={task._id} token={token} />}
        </div>
      </div>
    </div>
  );
}
