const Users = require('../models/user');
const errorHandler = require('../helpers/dbErrorHandler');

exports.registerUser = (req, res, next) => {
  const user = new Users(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    return res.status(200).json({
      message: 'Nuew User Registered Successfully!'
    });
  });
};

exports.findUserById = (req, res, next, id) => {
  Users.findById(id).exec((err, user) => {
    if (err || user) {
      return res.status(400).json({
        error: 'No User found with that credentials'
      });
    }
    req.profile = user;
    next();
  });
};

exports.findUserProfile = (req, res) => {
  req.profile.hashedPassword = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deleteUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    deleteUser.hashedPassword = undefined;
    user.salt = undefined;
    res.json(user);
  });
};
