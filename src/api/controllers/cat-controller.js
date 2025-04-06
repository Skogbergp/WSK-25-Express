import {
  addCat,
  findCatById,
  listAllCats,
  findCatByUserId,
  modifyCat,
} from '../models/cat-model.js';
import {authUser} from './auth-controller.js';

const getCat = async (req, res) => {
  try {
    res.json(await listAllCats());
  } catch (error) {
    console.error('Error in getCat:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  try {
    const {cat_name, weight, owner, birthdate} = req.body;

    if (!cat_name || !weight || !owner || !birthdate) {
      return res.status(400).json({message: 'All fields are required'});
    }

    const filename = req.file ? req.file.filename : null;

    const result = await addCat({cat_name, weight, owner, birthdate, filename});

    if (result.cat_id) {
      console.log(req.file);
      res.status(201).json({message: 'New cat added.', result});
    } else {
      res.status(400).json({message: 'Failed to add cat.'});
    }
  } catch (error) {
    console.error('Error in postCat:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const putCat = async (req, res) => {
  const user = res.locals.user;
  console.log('user', user);
  const result = await modifyCat(req.body, user);

  res.json(result);
};

const deleteCat = async (req, res) => {
  const user = res.locals.user;
  const cat = await findCatById(req.params.id, user.user_id);
  if (!cat) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(200);
};

const getCatByOwner = async (req, res) => {
  const cat = await findCatByUserId(req.params.id);
  console.log(cat);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatByOwner};
