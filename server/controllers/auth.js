const Users = require('../models/user');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const config = require('../config/index');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
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

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  //return res.send(email);
  try {
    let user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      `${process.env.JWT_SCRETE}`,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({
    message: 'Sign out Successful!'
  });
};

exports.requireSignin = expressjwt({
  secret: `${process.env.JWT_SCRETE}`,
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
