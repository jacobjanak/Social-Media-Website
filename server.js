const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const mongoose = require('mongoose');
const morgan = require('morgan');

// server
const app = express();
const PORT = process.env.PORT || 3001;

// db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/innovations')

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('client/build'))
app.use(morgan('dev'))

// routing
app.use(require('./routes/user-authentication'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// start server
app.listen(PORT, () => console.log(`🌎 ==> Server now on port ${PORT}!`))
