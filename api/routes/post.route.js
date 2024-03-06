import express from 'express';
import {verifyUser} from '../utils/verifyUser.js'
import { create, deletePost, getPost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create',verifyUser,create)
router.get('/getPost',getPost)
router.delete('/deletePost/:postId/:userId',verifyUser,deletePost)
 
export default router