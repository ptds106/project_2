var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var War = require('../models/history');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    War.findOne({ 'googleId': profile.id }, function(err, war) {
      if (err) return cb(err);
      if (war) {
        return cb(null, war);
      } else {
          // we have a new user via OAuth!
          var newWar = new War({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          })
          newWar.save(err => {
            if (err) return cb(err)
            return cb(null, newWar)
        });
      }
    });
  }
));
passport.serializeUser((war, done) => {
    done(null, war.id);
});
passport.deserializeUser((id, done) =>{
    War.findById(id, (err, war) =>{
      done(err, war);
    });
  });