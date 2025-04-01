import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(req.file.path);
  sharp(req.file.path)
    .resize(160, 160)
    .toFile(`uploads/${req.file.filename}_thumb`);
  next();
  return;
};

export {createThumbnail};
