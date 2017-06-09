const express = require('express');

const router = express.Router();
const winston = require('winston');
const folderController = require('./folderController');

// add other controllers

router.use('/folder', folderController);

router.get('/', (req, res) => {
  winston.info('lets see if this works');
  res.setHeader('status', 200);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify('hallo das ist der Start'));
});

module.exports = router;
