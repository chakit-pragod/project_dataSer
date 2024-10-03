var express = require('express');
var router = express.Router();

/* GET users listing. */
/*
router.get('/dashboard', function(req, res, next) {
  res.render('user/home');
});

router.get('/table', function(req, res, next) {
  res.render('user/tables');
});

router.get('/table/create', function(req, res, next) {
  res.render('user/createData');
});

router.get('/news', function(req, res, next) {
  res.render('user/news');
});
*/

function redirectIfAuthenticated(req, res, next) {
  if (req.session.user) {
    // User is logged in, redirect them to a protected page like the dashboard
    if (req.session.usertype == '0'){
      return res.json("not permission");
    }
  }
  // User is not logged in, allow them to proceed
  next();
}

router.get('/table/create', redirectIfAuthenticated, (req, res) => {
  if (req.session.user) {
    // Pass user data to the announce page
    res.render('user/createData', { username: req.session.user });
  } else {
    // Redirect to login if no session exists
    res.redirect('/login');
  }
});

router.get('/dashboard', redirectIfAuthenticated, (req, res) => {
  if (req.session.user) {
    // Pass user data to the announce page
    res.render('user/home', { username: req.session.user });
  } else {
    // Redirect to login if no session exists
    res.redirect('/login');
  }
});

router.get('/table', redirectIfAuthenticated, (req, res) => {
  if (req.session.user) {
    // Pass user data to the announce page
    res.render('user/tables', { username: req.session.user });
  } else {
    // Redirect to login if no session exists
    res.redirect('/login');
  }
});

router.get('/news', redirectIfAuthenticated, (req, res) => {
  if (req.session.user) {
    // Pass user data to the announce page
    res.render('user/news', { username: req.session.user });
  } else {
    // Redirect to login if no session exists
    res.redirect('/login');
  }
});
module.exports = router;
