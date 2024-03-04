import express from 'express'
const router = express.Router();
import {deleteUser, signout, test, updateUser} from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js';

router.get('/test',test);
router.put('/update/:userId',verifyUser,updateUser)
router.delete('/delete/:userId',verifyUser,deleteUser)
router.post('/signout',signout)


export default router