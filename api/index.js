import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import postRouter from './routes/post.route.js';

import cookieParser from 'cookie-parser';

dotenv.config()


const server = express();

server.use(express.json())
server.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb is connected!!")
})
.catch((err)=>{
    console.log(err)
})

server.use('/api/user',userRouter)
server.use('/api/auth',authRouter)
server.use('/api/post',postRouter)

server.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!!'
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})

const PORT = 8080;
server.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})