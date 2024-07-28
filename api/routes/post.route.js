import express from 'express'
import { verifyUserToken } from '../utils/verifyUserToken.js';
import { create, deletepost, getposts, updatepost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyUserToken, create);
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyUserToken, deletepost);
router.put('/updatepost/:postId/:userId', verifyUserToken, updatepost);

export default router;