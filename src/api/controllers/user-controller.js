import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

import bcrypt from 'bcrypt';

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  console.log(req.body);
  if (result.user_id) {
    res.status(201).json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  const result = await modifyUser(req.body, req.params.id);
  if (result) {
    res.status(200).json({message: 'User updated.', result});
  } else {
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  const result = await removeUser(req.params.id);
  if (result) {
    res.status(200).json({message: 'User deleted.'});
  } else {
    res.sendStatus(400);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
