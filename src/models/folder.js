const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: String,
  filepath: String,
  created: { type: Date, default: Date.now },
  lastUpdated: { type: Date },
});

module.exports = folderSchema;
