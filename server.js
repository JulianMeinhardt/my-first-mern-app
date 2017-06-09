
const mongoose = require('mongoose');
const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');
const controllers = require('./src/controllers');


winston.add(winston.transports.File, { filename: 'logs/error.log' });

// start express app
const app = express();

// use body parser for app
app.use(bodyParser.json());
// teach app to use all controllers
app.use(controllers);

// Maybe this will be set by environment later, so save to a const
const url = 'mongodb://localhost:27017/Picture-Organizr';

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

