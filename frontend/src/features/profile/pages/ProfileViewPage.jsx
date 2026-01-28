 
 import classes from "./ProfileViewPage.module.css"
 import { useState,useEffect } from "react";
 import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchProfile, deleteProfile } from "../profileAPI";
  function ProfileViewPage(){
    const [loading, setLoading]= useState(false)
      const [profile, setProfile] = useState(null);
    const token = localStorage.getItem('token');
 
   const navigate = useNavigate();
//-------------------------------------------------------

  const { id } = useParams();
  console.log("EditProfilePage callse ProfileEditForm & pass profile id : ", id)

  useEffect(() => {
        async function profile(){
        const data = await fetchProfile(token);
    console.log("PROFILEVIEWPage: profile data: ", data);
    console.log("FrontEnd Get profile: ", data.message)
       setProfile(data);
    }
    profile();
  }, [id]);

  if (!profile) return <p>Loading...</p>;
//-----------------------------------------------------
  async function handleDelete(id){
        const confirm = window.confirm("Are you sure you delete this task?");
        if(!confirm){
            return;
        }
        setProfile(null);
        navigate("/profiles");
       }
//-----------------------------------------------------------------

console.log("------------ProfileViewPage-------------------profile-----------------: ", profile);
   const statusClasses={
    developer: classes.developer,
    admin: classes.admin,
    manager: classes.manager,
   };
   //const {id}= useParams();
   console.log("Profile mounted");

/*    let id = profile.id;
   console.log("ID in profileViewPage: ", id); */
   let badgeStyle = statusClasses[profile.role?.toLowerCase()|| ""]
       console.log("PROFILEVIEWPage: profile _id: ", profile._id);
    async function handleDeleteProfile(id){
       const confirm = window.confirm("Are you sure you want to delete this profile?");
        if (!confirm) return;
        setLoading(true)
            try{
                const response = await fetch(`http://localhost:3000/api/profile/delete/${profile._id}`, {
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
          //if(handleDelete) handleDelete(id);
              // React-side cleanup
          setProfile(null);
          navigate("/profiles");
            
        }catch(error){
            console.log("Something went wrong: ")
        }
        setLoading(false);  
    }

     async function handleEditProfile(id){
       navigate(`/profile/edit/${id}`)

    } 
    async function handleView(id){
        //navigate(`/profile/${id}`)
        navigate(`/dashboard`)
    }
    return <div className={classes.cardContainer}>
        
        <article className={classes.card}>
        <div className={classes.cardHeader}>
             <div>
            <p>
                    <strong>Avatar:</strong>
                    <span>{profile.avatar || "N/A"}</span>
            </p>
            <p className={classes.titleHeader}>{profile?.firstName} {profile?.lastName}</p>
             </div>
            <span className={`${classes.role} ${badgeStyle} ` }>{profile.role || 'Unknown'}</span>
        </div>
        <div className={classes.cardBody}>
            <p>{profile.bio  || "No bio provided"}</p>
        </div>
        <footer className={classes.cardFooter}>
              <div className={classes.assignment}>
             <p>
                <strong>Joined:</strong>
                <span> {new Date(profile.joinDate).toLocaleDateString()} </span>
            </p>
              
            </div>
            
           {profile._id && ( 
                             <p><strong >
                                    ProfileId:</strong>{profile._id.slice(0,6)}...{profile._id.slice(-4)}
                              </p>)}
            {/* <button onClick={() => navigator.clipboard.writeText(profile.id)}>Copy</button> */}
            <p><strong>Role:</strong>{(profile.role) || 'N/A'} </p>
        </footer>
        <div className={classes.actions}>
          <button onClick={()=>handleView(id)}         className={classes.viewBtn}>Cancel</button>
          <button onClick = {()=>handleEditProfile(id)} className={classes.editBtn}>Edit</button>
          <button onClick={()=>handleDeleteProfile(id)} className={classes.deleteBtn}>
            
            {(loading)?"Deleting...":"Delete"}
          </button>
          
        </div>
    </article>
    </div>
}

export default ProfileViewPage;