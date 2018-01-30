const passport = require('passport');
const jwt = require('passport-jwt');

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

var options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'), // Authorization: Bearer xxxxxx
  secretOrKey: 'secret'
};

passport.use(
  new JwtStrategy(options, function(payload, done) {
    // unix timestamp 10 digits
    if (payload.exp > Date.now() / 1000 | 0) {
      return done(null, {
        username: payload.username,
        verified: true
      });
    }

    return done(null, false);
  })
);

// `{session: false}` disables session, so that every API request needs to be authenticated
module.exports.needLogin = passport.authenticate('jwt', {session: false});
