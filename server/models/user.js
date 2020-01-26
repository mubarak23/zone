const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'User Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already Exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email Address is required'
  },
  hashPassword: {
    type: String,
    required: 'Paasword is Required'
  },
  salt: {
    type: String
  }
});

userSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashPassword = this.encryptedPassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.method = {
  authenticate: function(plainText) {
    return this.encryptedPassword(plainText) === this.hashPassword;
  },
  encryptedPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

const mainUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Users', mainUserSchema);
