
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileForm.module.css"
function ProfileForm(){
   const [userInput, setUserInput]= useState({
       firstName: "",
       lastName: "",
       role: "",
       bio:""
   })
   const navigate = useNavigate();
   //handle userinput on input change
   function handleOnChange(identifier, event){
       setUserInput((prev)=>{
          return { ...prev,
                [identifier]: event.target.value
          }
       })
   }
   // handle submit on button click
   async function handleSubmit(e){
       e.preventDefault();
     
   const user={ 
          firstName: userInput.firstName,
          lastName: userInput.lastName,
          role: userInput.role,
          bio: userInput.bio,
       };
       console.log("From profile page: ",user);
       try{
        const response = await fetch("http://localhost:3000/api/user/profile",{
           method: "POST",
           headers: {
               "Content-Type": "application/json",
                "authorization":`Bearer ${localStorage.getItem('token')}`
           },
           body:JSON.stringify(user)
       });
       if(!response.ok){
           console.log("error message ", response.status);
           return;
       }
       const data = await response.json();

       console.log(" Frontend Fetch post profile recieved from Backend ...", data.saveProfile);
        //  console.log(" Frontend Fetch ProfileFrom id returned from Backend ...", data.id);
         console.log(" Frontend Fetch ProfileForm recieved...id...from Backend ...", data.message);
        //setUserData(data);
        navigate('/dashboard')
       }catch(error){
         console.log("Error: resource not found")
       }
      
   }
       return <form className={classes.formWrapper} onSubmit={handleSubmit} method="POST">
            <div className={classes.formCard}>
               <div className={classes.inputGroup} >
                    <label htmlFor="firstName">First Name</label>
             <input 
                  type="text" 
                  name= "firstName"
                  id="firstName"
                  value={userInput.firstName}
                  onChange = {(event)=>handleOnChange("firstName", event)}
               />
            </div>
    
            <div className={classes.inputGroup} >
                    <label htmlFor="lastName">Last Name</label>
             <input 
                  type="text" 
                  name= "lastName"
                  id="lastName"
                  value={userInput.lastName}
                  onChange = {(event)=>handleOnChange("lastName", event)}
               />
            </div>
             <div className={classes.inputGroup} >
               <label htmlFor="role">Role</label>
              <select
                  id="role"
                  value= {userInput.role}
                  onChange={(event)=>handleOnChange("role", event)}
              >
                <option value="developer">developer</option>
                <option value="manager">manager</option>
                <option value="admin">admin</option>
              </select>
             </div>
            <div className={classes.inputGroup} >
                <label htmlFor="bio">Bio</label>
             <textarea 
                  type="text" 
                  name='bio' 
                  id="bio" 
                   value={userInput.bio}
                   onChange={(event)=>handleOnChange("bio", event)}
                  />
            </div>
               <button className={classes.btn} type="submit">Submit</button>
            </div>
       </form>
}
export default ProfileForm;