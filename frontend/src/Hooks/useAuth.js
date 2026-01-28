
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode";
export function useAuth(){
    const [user, setUser]= useState({})
    const [isAuthenticated, setIsAuthenticated]= useState(false);
    useEffect(()=>{
        const token = localStorage.getItem('token')
        console.log("What the status of token in: ", token);
        if(!token){
            logout
            return;
        }
        try{
             const decode = jwtDecode(token)
              console.log("What the status of jwtDecode(token) in: ", decode);
             const expired = Date.now() >=  decode.exp *1000;
             if(expired){
                logout()
                return;
             }
           else{
                 setIsAuthenticated(true);
                  setUser(decode)
                 const timeDelay = decode.exp * 1000 - Date.now();
                 console.log("What is the timeDelay in: ", timeDelay);
                   console.log("What is the time is now : ", Date.now());
                 setTimeout(logout, timeDelay);
                
           }
        }catch(error){
            logout()
            setIsAuthenticated(false);
            setUser(null);
        }
    }, [])

    function logout(){
    localStorage.removeItem("token")
    setIsAuthenticated(false);
    setUser(null)
}

return {
    logout,
    user,
    isAuthenticated
}
}



