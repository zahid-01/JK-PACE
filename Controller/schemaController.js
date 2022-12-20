const Scheme = require("../Model/schemeModal");

exports.createScheme = async (req, res, next) => {
  const scheme = await Scheme.create(req.body);

  res.status(200).json({
    status: "Success",
    data: {
      scheme,
    },
  });
};
