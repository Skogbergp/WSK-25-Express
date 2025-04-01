import {addCat, findCatById, listAllCats} from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
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
  const result = await addCat(req.body);
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

export {getCat, getCatById, postCat, putCat, deleteCat};
