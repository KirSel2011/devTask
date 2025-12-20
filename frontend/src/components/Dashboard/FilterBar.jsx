import classes from "./FilterBar.module.css"
export default function FilterBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  userFilter,
  setUserFilter,
  sortAsc,
  setSortAsc,
  users
}) {
  return (
    <div className={classes.filterBar}>
      {/* SEARCH */}
      <input className={classes.searchInput}
        placeholder="Search by title or description"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* STATUS FILTER */}
      <select className={classes.filterSelect}
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="todo">Todo</option>
        <option value="inprogress">In Progress</option>
        <option value="complete">Complete</option>
      </select>

      {/* USER FILTER */}
      <select className={classes.filterSelect}
        value={userFilter}
        onChange={e => setUserFilter(e.target.value)}
      >
        <option value="">All Users</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.assignedTo}
          </option>
        ))}
      </select>

      {/* SORT */}
      <button className={classes.sortBtn} onClick={() => setSortAsc(prev => !prev)}>
        Due Date {sortAsc ? "↑" : "↓"}
      </button>
    </div>
  );
}
