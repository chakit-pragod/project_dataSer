var express = require('express');
var router = express.Router();

/*
router.get('/announce', function (req, res, next) {
    res.render('admin/announce');
});

router.get('/userDetails', function (req, res, next) {
    res.render('admin/usersDetail');
});
*/

function redirectIfAuthenticated(req, res, next) {
    if (req.session.user) {
      // User is logged in, redirect them to a protected page like the dashboard
      if (req.session.usertype == '1'){
        return res.json("not permission");
      }
    }
    // User is not logged in, allow them to proceed
    next();
}

router.get('/announce', redirectIfAuthenticated, (req, res) => {
    if (req.session.user) {
      // Pass user data to the announce page
      res.render('admin/announce', { username: req.session.user });
    } else {
      // Redirect to login if no session exists
      res.redirect('/login');
    }
});

router.get('/userDetails', redirectIfAuthenticated, (req, res) => {
    if (req.session.user) {
      // Pass user data to the announce page
      res.render('admin/usersDetail', { username: req.session.user });
    } else {
      // Redirect to login if no session exists
      res.redirect('/login');
    }
});

module.exports = router;