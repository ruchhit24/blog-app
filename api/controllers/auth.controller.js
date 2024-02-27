import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';

export const signup = async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password)
    {
        res.status(400).json({message : 'all fileds are required'})
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
        res.status(500).json({message : error.message})
     }
}