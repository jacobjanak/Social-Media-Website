const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const random = require('../utils/random');

const ConfirmSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  key: {
    type: String,
    default: random.string(8)
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Confirm', ConfirmSchema);
