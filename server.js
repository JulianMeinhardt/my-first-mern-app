
const express = require('express');
const bodyParser= require('body-parser');

const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.urlencoded({extended: true}))


MongoClient.connect('link-to-mongodb', (err, database) => {
  // ... start the server
})

app.listen(3000, function() {
  console.log('listening on 3000');
})

app.get('/', (req, res) => {
  console.log('__dirname:' + __dirname);
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
  console.log(req.body);
  res.status = 200;
  return res;
})