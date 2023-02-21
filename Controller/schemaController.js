const Scheme = require('../Model/schemeModal');
const { catchError } = require('../utils/asyncCatch');
const createError = require('../utils/createError');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new createError('Not an image', 400)(), false);
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadSchemePhoto = upload.single('photo');

exports.resizeSchemePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/schemes/${req.file.filename}`);

  next();
});

exports.schemeUploadPhoto = catchError(async (req, res, next) => {
  const id = req.body.id;
  const file = req.file.filename;

  const schemePhoto = await Scheme.findByIdAndUpdate(id, { photo: file });

  res.status(200).json({
    status: 'Success',
    message: 'Photo uploaded successfully',
  });
});

exports.createScheme = catchError(async (req, res, next) => {
  const scheme = await Scheme.create(req.body);
  scheme.inspOfficer(req.user.id);
  scheme.save();
  res.status(200).json({
    status: 'Success',
    data: {
      scheme,
    },
  });
});

exports.getSchemes = catchError(async (req, res, next) => {
  const schemes = await Scheme.find();

  res.status(200).json({
    status: 'Success',
    data: {
      // schemes: schemes.length(),
      schemes,
    },
  });
});
