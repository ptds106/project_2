var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var History = require('../models/history');


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    History.findOne({ 'googleId': profile.id }, function(err, history) {
      if (err) return cb(err);
      if (history) {
        return cb(null, history);
      } else {
        // we have a new history via OAuth!
        var newHistory = new History({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newHistory.save(function(err) {
          if (err) return cb(err);
          return cb(null, newHistory);
        });
      }
    });
  }
));
passport.serializeUser((history, done) => {
    done(null, history.id);
});
passport.deserializeUser((id, done) =>{
    History.findById(id, (err, history) =>{
      done(err, history);
    });
  });