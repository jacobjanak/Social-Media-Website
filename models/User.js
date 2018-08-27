const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const random = require('../utils/random');

const UserSchema = new Schema({
  url: {
    type: String,
    default: random.string(8),
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
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
    maxlength: [32, 'Password must be no longer than 32 characters long']
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
    minength: [1, 'First name must be at least 1 character long'],
    maxlength: [50, 'First name must be no longer than 50 characters long']
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    minength: [1, 'Last name must be at least 1 character long'],
    maxlength: [50, 'Last name must be no longer than 50 characters long']
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

UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There is already an account with that email'))
  } else {
    next(error)
  }
})

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema);
