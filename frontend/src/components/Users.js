import { useEffect, useState } from "react"
const token = localStorage.getItem('token');
function Users(){
    const [users, setUsers]= useState([]);
 useEffect(()=>{
    async function fetchAllUsers(){
       try{
         const response = await fetch("http://localhost:3000/api/users", {
            headers: {
                 "authorization": `Bearer ${token}`
            }
         });
         if(!response.ok){
            console.log("users not found", response.status)
            return;
         }
         const usersData = await response.json();
         setUsers(usersData)
       }catch(error){
           console.log("something went wrong: ", error);
       }
    }
    fetchAllUsers();
 }, [])

 return <div>
      <ul>
      <h2>Users</h2>
        {users.map(user=> <li key={user._id}>{user.name}</li>)}
      </ul>
 </div>
}
export default Users;