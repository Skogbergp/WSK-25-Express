import express from 'express';
import {
  getuser,
  getuserById,
  postuser,
  putuser,
  deleteuser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getuser).post(postuser);

userRouter.route('/:id').get(getuserById).put(putuser).delete(deleteuser);

export default userRouter;
