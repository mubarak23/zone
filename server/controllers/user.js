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

exports.createUser = async (req, res) => {
  //return res.json(req.body);
  try {
    const { name, email, password } = req.body;
    //return res.json(name);
    const user = new Users({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    //return res.json(salt);
    user.password = await bcrypt.hash(password, salt);
    user
      .save()
      .then(user => {
        return res.status(200).json({
          user
        });
      })
      .catch(error => {
        return res.status(400).json({
          data: 'Error has occurs'
        });
      });
  } catch (err) {
    return res.send(err);
  }
};

exports.findUserById = (req, res, next) => {
  // return res.send(req.params.userId);
  Users.findById(req.param.userId).exec((err, user) => {
    if (err || user) {
      return res.status(400).json({
        error: 'No User found with that credentials'
      });
    }
    req.profile = user;
    next();
  });
};

exports.findUserWithId = (req, res) => {
  Users.findById({ _id: req.params.userId })
    .then(user => {
      return res.status(200).json({
        status: 'success',
        data: user
      });
    })
    .catch(error => {
      return res.status(400).json({
        status: error,
        message: 'Unable to find user'
      });
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
