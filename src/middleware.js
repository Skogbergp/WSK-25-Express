import sharp from 'sharp';

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

export {createThumbnail};
