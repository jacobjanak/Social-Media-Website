const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const random = require('../utils/random');

const ResetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  url: {
    type: String,
    default: random.string(8)
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reset', ResetSchema);
