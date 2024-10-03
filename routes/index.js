var express = require('express');
var router = express.Router();

function redirectIfAuthenticated(req, res, next) {
  if (req.session.user) {
    // User is logged in, redirect them to a protected page like the dashboard
    if (req.session.usertype == '0'){
      return res.redirect('admin/announce');
    }
    if (req.session.usertype == '1'){
      return res.redirect('users/dashboard');
    }
  }
  // User is not logged in, allow them to proceed
  next();
}

function ensureAuthenticated(req, res, next) {
  if (!req.session.user) {
    // User is not logged in, redirect to login page
    return res.redirect('/login');
  }
  // User is logged in, allow them to proceed
  next();
}

/* GET home page. */
router.get('/login', redirectIfAuthenticated, function(req, res, next) {
  res.render('auth/login');
});

router.get('/register', redirectIfAuthenticated, function(req, res, next) {
  res.render('auth/register');
});

router.get('/forgot-password', redirectIfAuthenticated, function(req, res, next) {
  res.render('auth/forgot-password');
});

router.get('/reset-password', redirectIfAuthenticated, function(req, res, next) {
  res.render('auth/reset-password');
});

module.exports = router;
