import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import path from 'path';

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import postRouter from './routes/post.route.js';

import commentRouter from './routes/comment.route.js';

import cookieParser from 'cookie-parser'; 

dotenv.config()

const __dirname = path.resolve();

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
server.use('/api/comment',commentRouter)

app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});



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