import jwt from "jsonwebtoken"
import {SECRETJWT} from "../../server.js"
const jwtUtility = (user) => {
  if (!user) {
    //throw new Error("jwtUtility ERROR: user is undefined or null!");
     return;
  }
  // destructure directly, no .toObject() needed
  console.log("From utility printout for user:", user);
  const { _id, name, email, passwordHash, createdAt, updatedAt } = user;

  const payload={
    id: _id,
    name: name,
    email: email
  }
  console.log("What is the Secret for singing for login credential: ", SECRETJWT);
  console.log("Destructuring OK:", _id, name, email);
    const token =  jwt.sign(payload, SECRETJWT, {
      expiresIn: "1hr",
      issuer: "devTask"
    })
    console.log("@@@@@@@@@@Token from utility printout@@@@@@@@@@@: ", token)
  
  return token;
};

export default jwtUtility;


  //const { _id, name, email, passwordHash, createdAt, updatedAt } = user;
  //const {_id,name, email, ...rest }= user;
/*   console.log("Id of the user in utitlit: ", _id);
  console.log("username of a user in utility: ", name);
 console.log("JWT_SECRET from utility: ", email)
 console.log("The rest will be:", rest); */


   