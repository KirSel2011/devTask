import {useEffect} from "react"
 import { useState } from "react";
import {useNavigate} from "react-router-dom"
import classes from "./Dashboard.module.css"
 function DashBoardPage(){
 const [boardState, setBoardState]= useState(" ");
 const navigate = useNavigate();
const token = localStorage.getItem('token');
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
    return <div className={classes.board}>
         <h1>{boardState.title}</h1>
         <p>{boardState.name}</p>
          <p>{boardState.tasks}</p>
         <p>{boardState.statusTask}</p>
    </div>
}
export default DashBoardPage;