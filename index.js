const express = require('express');
const mongooes = require('mongoose');
const cookieParse = require('cookie-parser');
const config = require('./server/config/index');
const userRoute = require('./server/routes/user');
const authRoute = require('./server/routes/auth');

//Db Connection
require('./server/config/dbConnection');

const app = express();

//setup the middlware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());

//add route
app.use('/', userRoute);
app.use('/', authRoute);

app.post('/api/test', function(req, res) {
  //res.send('hello world')
  console.log(req.body);
  //res.json(req.body);
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ':' + err.message });
  }
});

app.listen(8080, () => {
  console.log(`fly at port 8080`);
});
