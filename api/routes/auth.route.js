import express from 'express'
import { googleOAuth, signin, signup } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/googleOAuth',googleOAuth);

export default router;