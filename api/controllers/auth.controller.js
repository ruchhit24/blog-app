import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password)
    {
         next(errorHandler(400,'All fields are required!!'))
    }

    const hashedPassword = bcryptjs.hashSync(password,10);

     try {
        const newUser = new User({
            username,
            email,
            password : hashedPassword,
        });
        
        await newUser.save();
        res.status(200).json({message : 'signup successfully'})
     } catch (error) {
         next(error)
     }
}