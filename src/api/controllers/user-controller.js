import {adduser, finduserById, listAllusers} from '../models/user-model.js';

const getuser = (req, res) => {
  res.json(listAllusers());
};

const getuserById = (req, res) => {
  const user = finduserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postuser = (req, res) => {
  const result = adduser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putuser = (req, res) => {
  res.status(200);
  res.json({message: 'user updated.', result: req.body});
  res.sendStatus(200);
};

const deleteuser = (req, res) => {
  const user = finduserById(req.params.id);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(200);
};

export {getuser, getuserById, postuser, putuser, deleteuser};
