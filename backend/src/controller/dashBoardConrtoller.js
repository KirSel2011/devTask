
const dashboardController =(req, res, next)=>{
    //console.log("Dashboard controller display: ");
   res.status(200).json({
    title: "Displays for the usre profile",
    name: "Dashboard name of the user",
    taks: "current task of a user",
    statuTask: "status of the tasks"
   });
   
};
export default dashboardController;