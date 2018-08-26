const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const random = require('../utils/random');

const UserSchema = new Schema({
  url: {
    type: String,
    default: random.string(6),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: {
      unique: true
    }
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  img: {
    type: String,
    default: '/img/user/default.jpg'
  },
  gender: {
    type: String,
  },
  birthday: {
    type: String,
  },
  interests: [{
    type: String
  }],
  bio: {
    type: String,
  },
  education: {
    type: String,
  },
  ethnicity: {
    type: String,
  },
  street: {
    type: String,
  },
  zip: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  role: {
    entrepreneur: {
      type: Boolean,
      default: false
    },
    investor: {
      type: Boolean,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  businesses : [{
    type: Schema.Types.ObjectId,
    ref: 'Business'
  }]
});

// execute before each user.save() call
UserSchema.pre('save', function(callback) {
  const user = this;
  if (!user.isModified('password')) {
    return callback()
  }

  // if password changed we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    })
  })
})

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema);
