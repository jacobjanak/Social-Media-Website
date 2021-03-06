require('dotenv').config();
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
mongoose.connect(process.env.MONGODB_URI)

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('client/build'))
app.use(express.static('public'))
app.use(morgan('dev'))

// routing
app.use('/user', require('./routes/userController'))
app.use('/business', require('./routes/businessController'))
app.use('/email', require('./routes/emailController'))
app.use('/uploads', require('./routes/uploadsController'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// start server
app.listen(PORT, () => console.log(`🌎 ==> Server now on port ${PORT}!`))
