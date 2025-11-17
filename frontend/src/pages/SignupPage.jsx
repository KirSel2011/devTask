import { useState } from "react"

const [userInput, setUserInput]= useState({
    name: "",
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
export default function signupPage(){
    return <form action='/login' method="POST" onSubmit={handleUserInput}>
          <label htmlFor="name">name</label>
          <input 
               type="text" 
               name= "name"
               id="name"
               value={userInput.name}
               onChange = {(event)=>handleUserInput("name", event)}
            />
          <label htmlFor="password">password</label>
          <input 
               type="password" 
               name='password' 
               id="password"
               value= {userInput.password}
               onChange={(event)=>handleUserInput("password", event.value)}
          />
          <label htmlFor="email">Email</label>
          <input 
               type="text" 
               name='email' 
               id="email" 
                value={userInput.email}
                onChange={(event)=>handleUserInput("email", event.value)}
               />
        <button type="submit">Login</button>
    </form>
}