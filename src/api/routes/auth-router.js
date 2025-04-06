import express from 'express';
import {getMe, authUser} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middleware.js';
import {postUser} from '../controllers/user-controller.js';
const authRouter = express.Router();

authRouter.route('/login').post(authUser);
authRouter.route('/me').get(authenticateToken, getMe);
authRouter.route('/register').post(postUser);

export default authRouter;
