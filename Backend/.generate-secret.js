import crypto from "crypto";
//I generate the secret key ones and added ones 
const generateKey =()=>{ 
             const secretKey = crypto.randomBytes(32).toString('hex')
                return secretKey;
            };

export default generateKey;