import express from 'express'
import { verifyUserToken } from '../utils/verifyUserToken.js';
import { create, getposts } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyUserToken, create);
router.get('/getposts', getposts)

export default router;