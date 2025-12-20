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