var router = require('express').Router();
var passport = require('passport');


// The root route renders our only view
router.get('/', function(req, res) {
  res.redirect('/histories');
});
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/histories',
    failureRedirect : '/histories'
  }
));
 router.get('/logout', function(req, res){
   req.logout();
   res.redirect('/histories');
 });
module.exports = router;