import express from 'express'
const router = express.Router();
import {deleteUser, getUser, getUsers, signout, test, updateUser} from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js';

router.get('/test',test);
router.put('/update/:userId',verifyUser,updateUser)
router.delete('/delete/:userId',verifyUser,deleteUser)
router.post('/signout',signout)

router.get('/getUsers',verifyUser,getUsers)

router.get('/:userId', getUser);
export default router