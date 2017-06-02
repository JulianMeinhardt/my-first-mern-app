const express = require('express')
  , router = express.Router();
const winston = require('winston');

router.get('/', (req, res) => {
    res.setHeader('status', 200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify('hier kommen bald alle Ordner an'));
});

module.exports = router;