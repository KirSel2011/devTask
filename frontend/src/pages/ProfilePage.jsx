 
 import { useState, useEffect} from "react";
  const token = localStorage.getItem('token');
 function ProfilePage(){
 const [profileState, setProfileState]= useState(" ")
 useEffect(()=>{
         async function profile(){
    const response = await fetch("http://localhost:3000/profile",{
            headers: {
              "authorization": `Bearer ${token}`
            }
          });
    if(!response.ok){
      throw new Error("Error resource not found:", response.status);
    }
    const data = await response.json();
    console.log("profile data: ", data);
       setProfileState(data);
    }
    profile();
 }, [])
    console.log("profile state: ", profileState);
    return <div>
         <h1>{profileState.title}</h1>
         <p>{profileState.name}</p>
         <p>{profileState.status}</p>
    </div>
}
export default ProfilePage;