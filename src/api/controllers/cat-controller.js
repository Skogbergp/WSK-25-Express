import {
  addCat,
  findCatById,
  listAllCats,
  findCatByUserId,
} from '../models/cat-model.js';

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
  console.log(req.body);
  let result;
  if (req.file) {
    result = await addCat(req.body, res.file.filename);
  } else {
    result = await addCat(req.body);
  }
  console.log(req.body);
  if (result.cat_id) {
    console.log(req.file);
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  res.status(200);
  res.json({message: 'Cat updated.', result: req.body});
  res.sendStatus(200);
};

const deleteCat = async (req, res) => {
  const cat = await findCatById(req.params.id);
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
