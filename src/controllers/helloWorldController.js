const express = require('express');
const hal = require('hal');
const mongoose = require('mongoose');
const winston = require('winston');
const helloWorldSchema = require('../models/helloWorld');


const router = express.Router();
router.get('/', (req, res) => {
  const resource = new hal.Resource({ name: 'hello World' }, '/');
  res.setHeader('status', 200);
  res.setHeader('Content-Type', 'application/hal+json');
  res.send(resource.toJSON());
});

router.get('/:name', async (req, res) => {
  try {
    const HelloWorld = mongoose.model('HelloWorld', helloWorldSchema);
    HelloWorld.findOne({ name: req.params.name }, 'name created', (err, helloWorld) => {
      if (err) {
        return null;
      }
      return helloWorld;
    }).then((helloWorldDB) => {
      if (helloWorldDB) { // name is already known and registered in the dabase
        const visitor = {
          name: helloWorldDB.name,
          registered: true,
          registrationDate: helloWorldDB.created,
        };
        const resource = new hal.Resource({ ...visitor }, `/${visitor.name}`);

        res.setHeader('status', 200);
        res.setHeader('Content-Type', 'application/hal+json');
        res.send(resource);
      }
    });
  } catch (err) {
    winston.error('error while getting hello world by name');
    return {};
  }
});

router.post('/', (req, res) => {
  const HelloWorld = mongoose.model('HelloWorld', helloWorldSchema);
  const helloWorld = new HelloWorld({ ...req.body });
  winston.info(`folder ist: ${helloWorld}`);
  helloWorld.save((err) => {
    if (err) {
      winston.error('Error while saving hello World', err);
      res.sendStatus(500);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify('Sorry there was an error saving data to db.'));
    }

    res.set('Content-Type', 'application/hal+json')
        .status(201)
        .send(JSON.stringify(req.body));
  });
});

module.exports = router;
