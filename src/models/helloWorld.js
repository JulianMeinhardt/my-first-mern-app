const mongoose = require('mongoose');

const helloWorldSchema = new mongoose.Schema({
  name: String,
  created: { type: Date, default: Date.now },
  lastUpdated: { type: Date },
});

module.exports = helloWorldSchema;
