import {useEffect} from "react"
 import { useState } from "react";
import {useNavigate} from "react-router-dom"
 const token = localStorage.getItem('token');
 function DashBoardPage(){
 const [boardState, setBoardState]= useState(" ");
 const navigate = useNavigate();
useEffect(()=>{
  const dashBoard = async()=>{
    try{
          const response = await fetch("http://localhost:3000/dashBoard", {
            headers: {
              "authorization": `Bearer ${token}`
            }
          })
      if(!response.ok){
        throw new Error(`Error resource not found:, ${response.status}`);
      }if(response.status === 401){
        localStorage.removeItem(token);
        navigate('/login')
      }
      const data = await response.json();
      console.log("Data message indide dashBoard: ", data);
        setBoardState(data);
    }catch(error){
      console.log("Dashboard fetch error: ", error)
    }
       
    }
    dashBoard();
}, [])

   
    console.log("Output in dashboard from bandend dashboard: ", boardState);
    return <div>
         <h1>{boardState.title}</h1>
         <p>{boardState.name}</p>
         <p>{boardState.status}</p>
    </div>
}
export default DashBoardPage;