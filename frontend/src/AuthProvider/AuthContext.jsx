 import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
const authContext = createContext({
   login: ()=>{},
   logout: ()=>{},
   user: null,
   authenticatToken: false

});

export const AuthProvider=({children})=>{
    const [isAuthenticated, setIsAuthenticated]= useState(false);
    const [user, setUser]= useState(null)
    console.log("Inside AuthContext provider: ",localStorage.getItem("token"))
    useEffect(()=>{
        const token =localStorage.getItem('token');
        console.log("ContextProvider authenticated: ", token);
        if(!token) return;
        
        try{
            const decode = jwtDecode(token);
            const expires = Date.now() > decode.exp * 1000;

            if(!expires){
                setUser(decode);
                setIsAuthenticated(true)
            }else{
                   localStorage.removeItem('token');
            }
         
        }catch(error){
            localStorage.removeItem('token');
        }

    }, [])

    useEffect(()=>{

        if(!user?.exp) return;
        const delay = user.exp*1000 - Date.now();
        if(delay <= 0){
            logout();
            return
        }
       const timeout =setTimeout(logout, delay);
       return ()=>clearTimeout(timeout);

    }, [user])
    const login =(newToken)=>{

          if (!newToken || typeof newToken !== "string") {
            console.error("Invalid token passed to login:", token);
            return;
            }
        localStorage.setItem("token", newToken);
        const decode = jwtDecode(newToken);
        setUser(decode);
        setIsAuthenticated(true);
        
};
const logout=()=>{
     localStorage.removeItem("token")
     setUser(null);
     setIsAuthenticated(false);
};

const authData = {
    login: login,
    logout: logout,
    user,
    isAuthenticated
};

console.log("ContextProvider in AuthContext user value:", user)
  return (<authContext.Provider value={authData}>
                {children}
         </authContext.Provider>)


};
 //export const useAuth =()=>useContext(authContext);

 export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

