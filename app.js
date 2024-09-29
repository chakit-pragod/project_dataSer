const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');

const app = express();
const MONGODB_URI = 'mongodb://localhost:27017/userDB';

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match.');
  }

  try {
      const existingUser = await User.findOne({ email });
      var usertype = '1';
      if (existingUser) {
          return res.status(400).send('Email already in use.');
      }

      const newUser = new User({
          usertype,
          username,
          email,
          password
      });

      const savedUser = await newUser.save();
      console.log('User saved:', savedUser); // Log the saved user
      res.status(201).send('User registered successfully');
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('User not found');

  if (user.password !== password) {
      return res.status(400).send('Invalid password');
  }

  // Redirect to different views based on user type
  if (user.usertype === '0') {
    res.render('admin/announce'); // Render admin view
  } else if (user.usertype === '1') {
    res.render('user/home'); // Render user view
  }
});

// forgot endpoint
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(400).send('Email not found');
  }

  // Render the reset-password page and pass the email
  res.render('auth/reset-password', { email: user.email });
});

// reset password endpoint
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).send('Email not found');
      }

      // Update the user's password
      user.password = newPassword; // You might want to hash this password before saving
      await user.save();

      res.status(200).send('Password updated successfully');
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
