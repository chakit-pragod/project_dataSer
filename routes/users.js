var express = require('express');
var router = express.Router();

/* GET users listing. */
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

module.exports = router;
