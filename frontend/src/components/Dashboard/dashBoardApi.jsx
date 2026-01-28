export async function deleteTask(token, id){
     const response = await fetch(`http://localhost:3000/api/tasks/delete/${id}`, {
                method: 'DELETE',
                headers:{
                    "authorization": `Bearer ${token}`
                },
            });
            if(!response.ok){
                console.log("Server does not respond",response.status)
            }
        return response.json();
}

//  const API_URL =
export async function updateTask(taskData, token, id){
     await fetch(`http://localhost:3000/api/tasks/update/${id}`,{
                method: "PUT",
                headers:{
                "Content-Type": "application/json",
                "authorization":(token)? `Bearer ${token}`: " "
            },
            body: JSON.stringify(taskData)
        })
        if(!response.ok){
            console.log("resources not found in the server: ",response.status);
        }
        return response.json()
}

export async function fetchListOfUsers(token){
    const response = await fetch('http://localhost:3000/api/users', {
         headers: {
                 "authorization": `Bearer ${token}`
            }
      })
      if(!response.ok){
        console.log("Error message: ", response.status);
      }
        return response.json();
}
/* export async function deleteTask(token, id){
     const response = await fetch(`http://localhost:3000/api/profile/delete/${id}`, {
                method: 'DELETE',
                headers:{
                    "authorization": `Bearer ${token}`
                },
            });
            if(!response.ok){
                console.log("Server does not respond",response.status)
            }
        return response.json();
} */
export async function fetchTasks(token){
     const response = await fetch(`http://localhost:3000/api/tasks`,{
            headers:{
                'authorization': `Bearer ${token}`
                // 'id'           :`${id}`
                //'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        });
        if(!response.ok){
            //throw new Error({message:`resources not found: ${response.status}`})
            console.log("Resources not found")
        }if(response.status === 401){
            localStorage.removeItem('token');
            navigate("/login")
            return;
        }
    return response.json();
}