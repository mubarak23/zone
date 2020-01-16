import mongoose from 'mongoose';
import config from './index';

const URL = config.mongoURI;
mongoose.connect(URL);

mongoose.connection.on('connected', () => {
  console.log('Established MongoDB Default connection');
});

mongoose.connection.on('err', err => {
  console.log('Established MongoDB Default connection Error:' + err);
});
