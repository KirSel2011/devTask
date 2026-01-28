 import { useState, useEffect} from "react";
 import classes from "./Profile.module.css"
 import ProfileCard from "../components/ProfileCard.jsx"
 function ProfilePage(){
 const [profileState, setProfileState]= useState({})
 useEffect(()=>{
         async function profile(){
    const response = await fetch("http://localhost:3000/profile",{
            headers: {
              "authorization":`Bearer ${localStorage.getItem('token')}`
            }
          });
    if(!response.ok){
      console.log("Error resource not found:", response.status);
    }
    const data = await response.json();
    console.log("profile data: ", data);
    //console.log("FrontEnd Get profile: ", data.message)
       setProfileState(data);
    }
    profile();
 }, [])

  async function handleDelete(id){
        const confirm = window.confirm("Are you sure you delete this task?");
        if(!confirm){
            return;
        }
        setProfileState(prev=>prev.filter(profile=> profile._id !== id));
       }
    console.log("profile state: ", profileState);
    return <div>
        <ProfileCard profile= {profileState} onDelete={handleDelete}/>
    </div>
}
export default ProfilePage;