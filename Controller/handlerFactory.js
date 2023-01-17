const { catchError } = require('../utils/asyncCatch');
const createError = require('../utils/createError');

exports.createOne = (Model) =>
  catchError(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(200).json({
      status: 'Success',
      data: {
        data: doc,
      },
    });
  });

exports.readOne = (Model) =>
  catchError(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) return next(new createError('No record found', 404));

    res.status(200).json({
      status: 'Success',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchError(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    }).select('-password');

    if (!doc) return next(new createError('No record found', 404));

    res.status(200).json({
      status: 'Success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchError(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(new createError('No record found', 404));

    res.status(204).json({
      status: 'Success',
    });
  });

exports.findAll = (Model) =>
  catchError(async (_, res, next) => {
    const doc = await Model.find();

    res.status(200).json({
      status: 'Success',
      data: {
        doc,
      },
    });
  });
