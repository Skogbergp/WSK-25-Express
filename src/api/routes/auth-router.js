import express from 'express';
import {getMe, authUser} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middleware.js';
const authRouter = express.Router();

authRouter.route('/login').post(authUser);
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
