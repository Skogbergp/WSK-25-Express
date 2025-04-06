import {login, addUser} from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const registerUser = async (req, res) => {
  console.log('req.body', req.body);
  const user = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    role: 'user',
  };

  console.log('user', user);

  const result = await addUser(user);
  if (result.user_id) {
    res.status(201).json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);
  if (res.locals.user) {
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.status(401);
  }
};

const authUser = async (req, res) => {
  const result = await login(req.body.username);

  const passwordValid = bcrypt.compareSync(req.body.password, result.password);

  console.log('password is valid', passwordValid);

  if (!passwordValid) {
    res.sendStatus(401);
    return;
  }

  const userWithNoPassword = {
    user_id: result.user_id,
    name: result.name,
    username: result.username,
    email: result.email,
    role: result.role,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({user: userWithNoPassword, token});
};
export {getMe, authUser, registerUser};
