import classes from "./TaskEditModal.module.css"
import Input from "../../pages/Input";
import { useState, useEffect } from "react"
export default function TaskEditModal({task, onClose, onSave, users}){
const [editTask, setEditTask]= useState({});
useEffect(() => {
  setEditTask(task);
}, [task]);

    /* function handleOnSubmit(e){
        e.preventDefault()
        onSave(editTask)
    } */
    function handleOnSubmit(e) {
  e.preventDefault();

  const assignedUser = users.find(u => u._id === editTask.assignedTo);

  onSave(editTask._id, {
    ...editTask,
    assignedTo: assignedUser || null
  });
}

    function handleModalClose(){
      onClose()
    }
    return <div className={classes.overlay}>
    <div className={classes.modal}>
        <div className={classes.mainHeader}>
            <h2>Edit Task</h2>
        </div>
        <form onSubmit={handleOnSubmit}>
        <Input 
                type= "text" 
                id="title"   
                name="title" 
                label="Title"
                value={editTask.title || ""}
                onChange={(e)=>setEditTask({...editTask, title: e.target.value})}
             />
                 <Input 
                type= "text" 
                id="description"   
                name="description" 
                label="Description"
                value={editTask.description || ""}
                onChange={(e)=>setEditTask({...editTask, description: e.target.value})}
            />  
                <label htmlFor='status'>Status</label>
                <select
                    className={classes.selectBox}
                    id="status"
                    name="status"
                   value={editTask.status || ""}
                   onChange={(e)=>setEditTask({...editTask, status: e.target.value})}
                  >
                    <option value="todo">Todo</option>
                    <option value='inprogress'>InProgress</option>
                    <option value='complete'>Complete</option>
                    <option value='pending'>Pending</option>
                </select>
        
                 <select
                    name="assignedTo"
                    value={editTask.assignedTo || ""}
                    onChange={(e)=>setEditTask({...editTask, assignedTo: e.target.value})}
                 >
                    <option value=""> ---Select User---</option>
        
                        {(users || []).map((user)=>(<option key={user._id} value={user._id}>{user.name}</option>))}
                   
                 </select>
                
                 <Input 
                type= "date" 
                id="dueDate" 
                name="dueDate" 
                label="DueDate"
               value={editTask.dueDate || ""}
                onChange={(e)=>setEditTask({...editTask, dueDate: e.target.value})}
            />
        <button type="submit">Save</button>
        <button type="button" onClick={handleModalClose}>close</button>
        </form>
    </div>
    </div>
}