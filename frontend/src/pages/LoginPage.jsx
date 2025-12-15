import { useState } from "react"
import style from "./Login.module.css"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
export default function LoginPage(){
   const [userInput, setUserInput]= useState({
    email: "",
    password: ""
});
const [token, setLoginToken]= useState(()=>{
  return localStorage.getItem("token") || null
});
const navigate= useNavigate();
function handleOnChange(identifier, event){
    setUserInput((prev)=>{
       return { ...prev,
             [identifier]: event.target.value
       }
    })
};
async function handleOnSubmit(e){
      e.preventDefault();
      console.log("Login handleSubmit function: ", userInput.email ,  " :",   userInput.password)
      const user = { 
                         email: userInput.email, 
                         password: userInput.password
                  };

  const response = await fetch("http://localhost:3000/api/auth/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": (token)? `Bearer ${token}`: " "
        },
        body:JSON.stringify(user)
    });
      if(!response.ok){
        console.log("Error message : ", response.status);
      }
      const data = await response.json();
      console.log("successfully login data at the frontend is valid: ", data.message);
    console.log(" Frontend Fetch login recieved from Backend ...", data.user);
        const tokenPass = data.token;
        console.log("Token LoginPage: created & returned from backend to LoginPage: ",tokenPass)
         const saveToken =(tokenPass)=>{
               localStorage.setItem("token", tokenPass);
               setLoginToken(tokenPass);
         }
         saveToken(tokenPass)
         console.log("Token LoginPage:  stored localStorage and get from LocalStorage: ",token)
        console.log("Token LoginPage: localStorage.getItem('token'): ",localStorage.getItem("token"))
    //toast.success("Login successfuly!")
    toast.success("Task created!", {
  position: "top-right",
  style: {
    background: "#1e293b",
    color: "#fff",
    fontSize: "18px",
    borderRadius: "8px",
    padding: "12px 20px",
  },
});
/* 
toast.error("Login failed!", {
  className: "my-error-toast",
}); */
   navigate("http://localhost:5173")
};
    return <div className={style.formsWrapper}> 
        <form className={style.formCard}  method="POST" onSubmit={handleOnSubmit}>
          <div className={style.inputGroup} >
           
                 <label htmlFor="email">Email</label>
          <input 
               type="text" 
               name='email' 
               id="email" 
               value={userInput.email}
               onChange={(event)=>handleOnChange("email", event)}
               />
           
            
                  <label htmlFor="password">Password</label>
          <input 
               type="password" 
               name='password' 
               id="password"
               value= {userInput.password}
               onChange={(event)=>handleOnChange("password", event)}
          />
          
        <div className={style.btn}>
            <button type="submit">Login</button>
        </div>  
        
          </div>
        </form>
    </div>
}