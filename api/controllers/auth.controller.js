import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

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

export const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password)
    {
     next(errorHandler(400,'all fiels are required!!!'))
    }
    try {
        const validUser = await User.findOne({email});
        if(!validUser)
        {
            return next(errorHandler(400,'user not found!!'))
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword)
        {
            return next(errorHandler(400,'ur password is incorrect!!'))
        }

        const token = jwt.sign({id : validUser._id},process.env.ACCESS_TOKEN_KEY,{expiresIn : '1d'})
        res.status(200).cookie('access_token',token,{httpOnly : true})
        .json(validUser)
    } catch (error) {
        next(error);
    }
}

export const googleOAuth = async(req,res,next)=>{ 
        const { email, name, googlePhotoUrl } = req.body;
        try {
          const user = await User.findOne({ email });
          if (user) {
            const token = jwt.sign({ id: user._id},process.env.ACCESS_TOKEN_KEY);
            const { password, ...rest } = user._doc;
            res
              .status(200)
              .cookie('access_token', token, {
                httpOnly: true,
              })
              .json(rest);
          } 
          else {
            const generatedPassword =
              Math.random().toString(36).slice(-8) +
              Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
              username:
                name.toLowerCase().split(' ').join('') +
                Math.random().toString(9).slice(-4),
              email,
              password: hashedPassword,
              profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign(
              { id: newUser._id},
              process.env.ACCESS_TOKEN_KEY
            );
            const { password, ...rest } = newUser._doc;
            res
              .status(200)
              .cookie('access_token', token, {
                httpOnly: true,
              })
              .json(rest);
          }
        } catch (error) {
          next(error);
        }
      }
 