import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'


dotenv.config()

const server = express();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb is connected!!")
})
.catch((err)=>{
    console.log(err)
})

server.use('/api/user',userRouter)

const PORT = 8080;
server.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})