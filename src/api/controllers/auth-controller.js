import {login} from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);
  if (res.locals.user) {
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.status(401);
  }
};

const authUser = async (req, res) => {
  try {
    const user = await login(req.body.username);
    if (!user) {
      res.status(401);
      return;
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(401);
      return;
    }
    const userWithoutPassword = {
      user_id: user.user_id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    res.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Error in authUser:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};
export {getMe, authUser};
