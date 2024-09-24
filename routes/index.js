var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.get('/register', function(req, res, next) {
  res.render('auth/register');
});

router.get('/forgot-password', function(req, res, next) {
  res.render('auth/forgot-password');
});

router.get('/reset-password', function(req, res, next) {
  res.render('auth/reset-password');
});

module.exports = router;
