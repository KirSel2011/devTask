import Task from "../models/Task.js"
import User from "../models/User.js"
import {useParams} from 'react-router-dom'
import mongoose from "mongoose"
import { ObjectId } from "bson"
// import {useNavigate} from 'react-router-dom'
export const getTasks = async (req, res, next)=>{

        try{ 
            //const {id}= req.params;
            const id = req.user.id;
        //    console.log("#############task ID comes from url:&&&&&&&& ", id);
          // const userId = new mongoose.Types.ObjectId(id);
            const userId = mongoose.Types.ObjectId.createFromHexString(id);
            //const id = req.headers['id'];
          //console.log("Task data id: ", id);
          const tasks = await Task.find({
            $or:[
                {assignedTo: userId},
                {createdBy: userId}
                  
            ]
          })
            .populate({
                path: "createdBy",
                select: "name email"  
            })
            .populate({
                path: "assignedTo",
                select: "name email"
            });
        //   console.log("######################My tasks id data is&&&&&&&&&&&&&& : ", tasks);
          
    res.status(200).json(tasks)
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Server error"})
        }
      
    
}
export const postTasks= async (req, res, next)=>{
    const {title, description, status, assignedTo, dueDate} = req.body;
     console.log("handleOnChange day: ", dueDate.day);
            console.log("handleOnChange month: ", dueDate.month);
             console.log("handleOnChange year: ", dueDate.year);
             console.log("Inside PostTask createdBy=req.user.id: ", req.user.id)
            
    console.log("PostTask data in backend: ", req.body)
      const taskObject = await Task.create({
        title: title,
        description: description,
        status: status,
        assignedTo: assignedTo,
        createdBy: req.user.id,
        dueDate: dueDate
        
      }) 
    //  console.log("################Task object stored in********************: ", taskObject.id)
    //  console.log("CreatedBy inside posttaskRoute: ", taskObject.createdBy)

    res.status(200).json({
        message: "Task created by the admin succesfuly",
        user:{
        id: taskObject.createdBy,
        title: taskObject.title,
        description: taskObject.description,
        status: taskObject.status,
        assignedTo: taskObject.assignedTo,
        createdBy: taskObject.createdBy,
        dueDate: taskObject.dueDate
        }
    })
}

export const updateTasks = async (req, res, next)=>{
    console.log("update body: ", req.body);
    console.log("update task with id: ", req.params.id);
    try{
        //mongoose.Types.createFromHexString(req.params.id)
        const updateTask =await Task.findByIdAndUpdate(req.params.id, {$set: req.body},
        {new: true, runValidators:true}
    );
    if(!updateTask){
        res.status(404).json({message: "task is not found"})
    }
    //res.json(updateTask)
    res.status(200).json(updateTask)

      }catch(error){
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
}
export const deleteTasks = async (req, res, next)=>{
    try{
        //const idTask = new mongoose.Types.createFromHexString(req.params.id)
        const {id}= req.params;
        console.log("DeleteTask id task output of extracted const {id}= req.params: ", id)
        console.log("------------------------req.params.id==================: ", req.params.id)
    const deleteTask =await Task.findByIdAndDelete(req.params.id);
 
    console.log("In Delete task controller req.param.id to be deleted : ", req.params.id)
    console.log("In Delete Task Controller deleted task: ", deleteTask)
    if(!deleteTask){
        res.status(404).json({message: "Task is not found"})
    };
    res.status(200).json({message: "Delete Tasks succeffuly"})
}catch(error){
    console.log(error);
    res.status(500).json({message: "Server error"})
}
}


/*  const getTasks = async (req, res, next)=>{
          const id = req.headers['id'];
          console.log("Task data id: ", id);
          const taskDb = await Task.findById(id);
          console.log("My task id data is : ", taskDb);
    /*      await Task.findById(id, (error, task)=>{
            if(error){
                console.log("error message: ")
            }else if(task){
                console.log("Task is foudnd")
            }else{
                console.log("data is not found")
            }
         }) */
   // res.status(200).json({
    //     user: {
    //    title: taskDb.title,
    //    description: taskDb.description,
     //   status: taskDb.status,
        //assignedTo: taskDb.assignedTo,
        //assignedBy: taskDb.assignedTo,
        //dueDate: taskDb.dueDate
      /// }
   // })
      
    
//}
//export default getTasks; */