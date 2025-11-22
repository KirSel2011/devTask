import User from "../models/User.js"

const authTetokenControll =async(req, res, next)=>{
    const {email, password}= req.body;

    if(!email || !password){
        req.statusCode(401).json({message: "Invalid credential"})
    }
    const user =await User.findOne("email");
    if(!user){
        console.log("In the middleware JWT: ", user);
        return res.status(401).json({message: "Invalid Credential"});

    }

     jwtUtility(user);

    next();
    
}
export default authTetokenControll;