import {addCat, findCatById, listAllCats} from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  const result = addCat(req.body);
  if (result.cat_id) {
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

const deleteCat = (req, res) => {
  const cat = findCatById(req.params.id);
  if (!cat) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(200);
};

export {getCat, getCatById, postCat, putCat, deleteCat};
