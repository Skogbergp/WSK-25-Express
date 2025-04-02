import express from 'express';
import multer from 'multer';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatByOwner,
} from '../controllers/cat-controller.js';
import {createThumbnail} from '../../middleware.js';

const catRouter = express.Router();

const upload = multer({dest: 'uploads/'});

catRouter
  .route('/')
  .get(getCat)
  .post(upload.single('file'), createThumbnail, postCat);

catRouter.route('/owner/:id').get(getCatByOwner);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
