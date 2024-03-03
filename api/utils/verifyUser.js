import jwt from "jsonwebtoken";
import {errorHandler} from '../utils/error.js'

export const verifyUser = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token)
    {
        return next(errorHandler(400,'Unauthorized User!!'))
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_KEY,(err,user)=>{
        if(err){
            return next(errorHandler(400,'UNauthorized User'))
        }
        req.user = user;
        next()
    })

}