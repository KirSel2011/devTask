// EditProfilePage.jsx
import {useState, useEffect} from "react"
import { useParams } from "react-router";
import EditForm from "../components/ProfileEditForm.jsx";
import {fetchProfile} from "../profileAPI.js"
export default function EditProfilePage() {
  const { id } = useParams();
  console.log("EditProfilePage callse ProfileEditForm & pass profile id : ", id)
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
        async function profile(){
    const data = await fetchProfile(token);
    console.log("profile data: ", data);
    console.log("FrontEnd Get profile: ", data.message)
       setProfile(data);
    }
    profile();
  }, [id]);

  if (!profile) return <p style={
                                 {
                                    display: 'flex', 
                                    height: "100vh", 
                                    justifyContent:'center', 
                                    alignItems:'center',
                                    fontSize:'20px',
                                    fontFamily:"sans-serif"
                                    }
                                    
                              }>Profile Not Created for this USer</p>;
  
  return <EditForm task={profile} />;
}