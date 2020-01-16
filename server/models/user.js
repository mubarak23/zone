import mongoose from 'mongoose';
import crypto from 'crypto';

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

userSchema.path('hashedPassword').validate(function(v) {
  if (this.hashPassword && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 character long.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required.');
  }
}, null);

export default mongoose.model('Users', userSchema);
