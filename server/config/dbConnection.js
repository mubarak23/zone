const mongooes = require('mongoose');
const config = require('./index');

const db = mongooes.connect(
  'mongodb://root:root123@ds263848.mlab.com:63848/zone',
  { useNewUrlParser: true },

  error => {
    if (error) {
      console.log('internal server error with mlab ');
      console.log(error);
    } else {
      console.log('Mongooes is connected to mlab DB');
    }
  }
);
