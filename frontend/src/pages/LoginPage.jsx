import { useState } from "react"

const [userInput, setUserInput]= useState({
    email: "",
    password: ""
})

function handleUserInput(identifier, event){
    event.prevetnDefault();
    setUserInput((prev)=>{
       return { ...prev,
             [identifier]: event.value
       }
    })
}
export default function LoginPage(){
    return <form action='/login' method="POST" onSubmit={handleUserInput}>
         <label htmlFor="email">Email</label>
          <input 
               type="text" 
               name='email' 
               id="email" 
               value={userInput.email}
               onChange={(event)=>handleUserInput("email", event.value)}
               />
          <label htmlFor="password">password</label>
          <input 
               type="password" 
               name='password' 
               id="password"
               value= {userInput.password}
               onChange={(event)=>handleUserInput("password", event.value)}
          />
          
        <button type="submit">Login</button>
    </form>
}