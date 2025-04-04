import sharp from 'sharp';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authenticateToken = (req, res, next) => {
  // console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  //console.log('token', token);
  if (token == null) return res.sendStatus(401);
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(403).send({message: 'Invalid token'});
  }
};

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  const ext = req.file.originalname.split('.').pop();
  console.log(req.file.path);
  await sharp(req.file.path)
    .resize(160, 160)
    .toFile(`uploads/${req.file.filename}_thumb.${ext}`);
  next();
  return;
};

export {authenticateToken, createThumbnail};
