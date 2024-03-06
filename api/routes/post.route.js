import express from 'express';
import {verifyUser} from '../utils/verifyUser.js'
import { create, deletePost, getPost, updatePost } from '../controllers/post.controller.js'; 

const router = express.Router();

router.post('/create',verifyUser,create)
router.get('/getPost',getPost)
router.delete('/deletePost/:postId/:userId',verifyUser,deletePost)
router.put('/updatePost/:postId/:userId',verifyUser,updatePost)
 
export default router