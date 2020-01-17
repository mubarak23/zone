const Users = require('../models/user');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const config = require('../config/index');

exports.signin = (req, res) => {
  Users.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: 'User not Found'
      });
    }
    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({
        error: 'wrong email or password'
      });
    }

    const token = jwt.sign(
      {
        _id: user._id
      },
      config.jwtScrete
    );

    res.cookie('t', token, {
      expire: new Date() + 9999
    });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({
    message: 'Sign out Successful!'
  });
};

exports.requireSignin = expressjwt({
  secret: config.JWT_SCRETE,
  userProperty: 'auth'
});

exports.hasAuthorization = (req, res) => {
  const authorized = req.profile && req.profile._id == req.auth._id;

  if (!authorized) {
    return res.status(400).json({
      error: 'User is not Authorized'
    });
  }
};
