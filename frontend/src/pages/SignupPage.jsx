import { useState } from "react"
import classes from "./Signup.module.css"
import { useNavigate } from "react-router"
export default function signupPage(){

    const [userInput, setUserInput]= useState({
    name: "",
    email: "",
    password: ""
})
const [userData, setUserData]= useState({})
const navigate = useNavigate();
//handle userinput on input change
function handleOnChange(identifier, event){
    setUserInput((prev)=>{
       return { ...prev,
             [identifier]: event.target.value
       }
    })
}
// handle submit on button click
async function handleSubmit(e){
    e.preventDefault();
    console.log("Signup page userName: ", userInput.name, "", userInput.password);
const user={ 
       name: userInput.name,
       email: userInput.email,
       password: userInput.password
    };
    console.log("From signup page: ",user);
    try{
             const response = await fetch("http://localhost:3000/api/auth/signup",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)

    });
    if(!response.ok){
        console.log("error message ", response.status);
        return;
    }
    const data = await response.json();
    console.log("if response ok data at the frontend is valid: ", data.message);
    console.log(" Frontend Fetch signup recieved from Backend ...", data.user);
      console.log(" Frontend Fetch signup recieved...id...from Backend ...", data.id);
     setUserData(data);
     
    }catch(error){
      console.log("Error: resource not found")
    }
   navigate('/login')
}
    return <form className={classes.formWrapper} method="POST" onSubmit={handleSubmit}>
         <div className={classes.formCard}>
            <div className={classes.inputGroup} >
                 <label htmlFor="name">Name</label>
          <input 
               type="text" 
               name= "name"
               id="name"
               value={userInput.name}
               onChange = {(event)=>handleOnChange("name", event)}
            />
         </div>
          <div className={classes.inputGroup} >
            <label htmlFor="password">Password</label>
          <input 
               type="password" 
               name='password' 
               id="password"
               value= {userInput.password}
               onChange={(event)=>handleOnChange("password", event)}
          />
          </div>
         <div className={classes.inputGroup} >
             <label htmlFor="email">Email</label>
          <input 
               type="text" 
               name='email' 
               id="email" 
                value={userInput.email}
                onChange={(event)=>handleOnChange("email", event)}
               />
         </div>
            <button className={classes.btn} type="submit">Submit</button>
         </div>
    </form>
}