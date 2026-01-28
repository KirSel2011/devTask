 
 import classes from "./ProfileCard.module.css"
 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
  function ProfileCard({profile, onDelete}){
    const [loading, setLoading]= useState(false)
    const token = localStorage.getItem('token');
    const statusClasses={
    developer: classes.developer,
    admin: classes.admin,
    manager: classes.manager,
   };
   //const {id}= useParams();
   console.log("Profile mounted");

   let id = profile.id;
   console.log("ID in profileCard: ", id);
   let badgeStyle = statusClasses[profile.role?.toLowerCase()|| ""]
   const navigate = useNavigate();

    async function handleDeleteProfile(id){
        setLoading(true)
            try{
                const response = await fetch(`http://localhost:3000/api/profile/delete/${profile.id}`, {
                method: 'DELETE',
                headers:{
                    "authorization": `Bearer ${token}`
                },
            });
            if(!response.ok){
                console.log("Server does not respond",response.role)
            }
            const data = await response.json();
           // console.log("Delete Task message repsonse from backend: ", data.message)
          if(onDelete) onDelete(id);
            
        }catch(error){
            console.log("Something went wrong: ")
        }
        setLoading(false);  
    }

     async function handleEditProfile(id){
       navigate(`/profile/edit/${id}`)

    } 
    async function handleView(id){
        navigate(`/profile/${id}`)
    }
    return <div className={classes.cardContainer}>
        
        <article className={classes.card}>
        <div className={classes.cardHeader}>
            <p className={classes.titleHeader}>{profile?.firstName} {profile?.lastName}</p>
            <span className={`${classes.role} ${badgeStyle} ` }>{profile.role || 'Unknown'}</span>
        </div>
        <div className={classes.cardBody}>
            <p>{profile.bio  || "No bio provided"}</p>
            <div className={classes.assignment}>
               {/*  <p><strong>FirsName:</strong>{profile.firstName?.firstName ||'Unassigned'} </p>
                <p><strong>lastName:</strong>{profile.lastName?.lastName || 'Unknown'}</p> */}

             <p>
                <strong>Joined:</strong>
                <span> {new Date(profile.joinDate).toLocaleDateString()} </span>
            </p>
               <p>
                    <strong>Avatar:</strong>
                    <span>{profile.avatar || "N/A"}</span>
                </p>
            </div>
        </div>
       {/*  <footer className={classes.cardFooter}>
            <p><strong>ProfileId:</strong>{(profile.id) || 'N/A'}</p>
        </footer> */}
        <div className={classes.actions}>
          <button onClick={()=>handleView(id)}         className={classes.viewBtn}>View</button>
          <button onClick = {()=>handleEditProfile(id)} className={classes.editBtn}>Edit</button>
          <button onClick={()=>handleDeleteProfile(id)} className={classes.deleteBtn}>
            
            {(loading)?"Deleting...":"Delete"}
          </button>
          
        </div>
    </article>
    </div>
}

export default ProfileCard;