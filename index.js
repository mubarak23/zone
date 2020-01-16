import express from 'express';
import cookieParse from 'cookie-parser';
import config from './server/config';

//Db Connection
require('./server/config/dbConnection');
const app = express();

//setup the middlware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ':' + err.message });
  }
});

app.listen(config.port, () => {
  console.log(`fly at port ${config.port}`);
});
