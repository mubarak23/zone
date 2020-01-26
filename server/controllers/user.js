const Users = require('../models/user');
const errorHandler = require('../helpers/dbErrorHandler');
const bcrypt = require('bcryptjs');

exports.registerUser = (req, res, next) => {
  //console.log(req.body);
  const { name, email, password } = req.body;
  console.log(email);
  const user = new Users({
    name,
    email,
    password
  });
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

exports.createUser = (req, res) => {
  //return res.json(req.body);
  const { name, email, password } = req.body;
  //return res.json(name);
  const user = new Users({
    name,
    email,
    password
  });

  const salt = bcrypt.genSalt(10);
  return res.json();
  user.password = bcrypt.hash(password, salt);
  user
    .save()
    .then(user => {
      return res.status(200).json({
        user
      });
    })
    .catch(error => {
      return res.status(400).json({
        error
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
