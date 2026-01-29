/* export default function DashboardMainView({ viewStatus, filteredTasks, handleAddNote, handleDeleteTask, handleEditModal }) {
  return (
    <div>
      <header className={classes.dashboardHeader}>
        <h1>Task Dashboard</h1>
        <p>View and manage tasks by assigned user</p>
      </header>

      <FilterBar ... />

      <div className={classes.btnWrapper}>
        <button className={classes.listBtn} onClick={() => setViewStatus("listView")}>List View</button>
        <button className={classes.kanbanBtn} onClick={() => setViewStatus("kanbanView")}>Kanban View</button>
      </div>

      {viewStatus === "listView" && (
        <TaskList tasks={filteredTasks} onAddNote={handleAddNote} onDelete={handleDeleteTask} onEdit={handleEditModal} />
      )}
      {viewStatus === "kanbanView" && (
        <KanbanBoard tasks={filteredTasks} onDelete={handleDeleteTask} onEdit={handleEditModal} />
      )}
    </div>
  )
} */
