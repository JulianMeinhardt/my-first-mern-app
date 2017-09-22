const express = require('express');
const hal = require('hal');

const router = express.Router();
const winston = require('winston');
const helloWorldController = require('./helloWorldController');

// add other controllers

router.use('/helloWorld', helloWorldController);

router.get('/', (req, res) => {
  winston.info('lets see if this works');
  res.setHeader('status', 200);
  res.setHeader('Content-Type', 'application/hal+json');
  const resource = new hal.Resource({});
  resource.link(new hal.Link('helloWorld', '/helloWorld'));
  res.send(resource.toJSON());
});

module.exports = router;
