import express from 'express'
import { deleteUser, test, updateUser } from '../controllers/user.controller.js';
import { verifyUserToken } from '../utils/verifyUserToken.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyUserToken, updateUser);
router.delete('/delete/:userId', verifyUserToken, deleteUser);

export default router;