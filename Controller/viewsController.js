exports.signUp = (req, res) => {
  res.status(200).render('signUp');
};

exports.logIn = (req, res) => {
  res.status(200).render('logIn');
};

exports.home = (req, res) => {
  res.status(200).render('homePage');
};

exports.ulbForm = (req, res) => {
  res.status(200).render('ulbForm');
};
