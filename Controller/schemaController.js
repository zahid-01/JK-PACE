const Scheme = require("../Model/schemeModal");
const { catchError } = require("../utils/asyncCatch");

exports.createScheme = catchError(async (req, res, next) => {
  const scheme = await Scheme.create(req.body);
  scheme.inspOfficer(req.user.id);
  scheme.save();
  res.status(200).json({
    status: "Success",
    data: {
      scheme,
    },
  });
});

exports.getSchemes = catchError(async (req, res, next) => {
  const schemes = await Scheme.find();

  res.status(200).json({
    status: "Success",
    data: {
      // schemes: schemes.length(),
      schemes,
    },
  });
});
