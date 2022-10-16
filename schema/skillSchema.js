const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  percent: {
    type: Number,
    required: true,
    trim: true,
  },
});
module.exports = skillSchema;
