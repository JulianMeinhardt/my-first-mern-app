
const mongoose = require('mongoose');
const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');
const controllers = require('./src/controllers');

// adds file log
// TODO: Needs to be refactored to cloud logging?!
winston.add(winston.transports.File, { filename: 'logs/error.log' });

// start express app
const app = express();

// use body parser for app
app.use(bodyParser.json());
// teach app to use all controllers
app.use(controllers);

// Maybe this will be set by environment later, so save to a const
// helloWorld does not need database
const url = 'mongodb://localhost:27017/my-first-mern-app';

mongoose.connect(url, (err, db) => {
  if (err) {
    return winston.error('error while connecting to mongodb', err);
  }

  app.listen(3000, () => {
    winston.info('listening on Port 3000');
  });

  app.get('/shutdown', (req, res) => {
    db.close();
    res.sendStatus(200);
  });
});

