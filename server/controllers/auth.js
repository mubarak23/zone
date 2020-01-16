import Users from '../models/user';
import jwt from 'jsonwebtoken';
import expressjwt from 'express-jwt';
import config from '../config/index';

export const signin = (req, res) => {
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

    const token = jwt.sign({
        _id: user._id
    }, config.jwtScrete);

    res.cookie('t', token, {
        expire: new Date() + 9999
    });
    return res.json({
        token,
        user: {
            _id: user._id, name: user.name, email: user.email
        }
    });

  });
};

