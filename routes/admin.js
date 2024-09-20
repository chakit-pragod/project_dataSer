var express = require('express');
var router = express.Router();

router.get('/announce', function (req, res, next) {
    res.render('admin/announce');
});

router.get('/userDetails', function (req, res, next) {
    res.render('admin/usersDetail');
});


module.exports = router;