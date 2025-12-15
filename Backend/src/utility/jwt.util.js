import jwt from "jsonwebtoken"
import {SECRETJWT} from "../../server.js"
const jwtUtility = (user) => {
  if (!user) {
  
     return;
  }

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

  
  return token;
};

export default jwtUtility;




   