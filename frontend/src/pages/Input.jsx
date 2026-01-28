import classes from "./TaskForm.module.css"
export default function Input({...props}){
    return <div className={classes.formCard}>
       <div className={classes.inputGroup}>
          <label htmlFor={props.id}>{props.label}</label>
            <input   {...props}/>
       </div>
    </div>
}