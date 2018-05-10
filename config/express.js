var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy
    //Other strategies go here
;
 
var verifyHandler = function(token, tokenSecret, profile, done) {
  process.nextTick(function() {
 
    User.findOne({username: profile.id}).exec(function(err, user) {
      if (user) {
        return done(null, user);
      } else {
    //     console.log('profile',profile,token,tokenSecret);
    //     var data = {
    //       provider: profile.provider,
    //       uid: profile.id,
    //       name: profile.displayName,
    //       username:profile.id,
    //       fullname:profile.displayName
    //     };
 
    //     if (profile.emails && profile.emails[0] && profile.emails[0].value) {
    //       data.email = profile.emails[0].value;
    //     }
    //     if (profile.name && profile.name.givenName) {
    //       data.firstname = profile.name.givenName;
    //     }
    //     if (profile.name && profile.name.familyName) {
    //       data.lastname = profile.name.familyName;
    //     }
    //  console.log('data',data)
        User.create({username:profile.id,fullname:profile.displayName,password:'123',url_avatar:profile.photos[0].value}).exec(function(err, userNew) {
            console.log('create user login fb',err,userNew)
          return done(err, userNew);
        });
      }
    });
  });
};
 
passport.serializeUser(function(user, done) {
  // console.log('user',user)
  done(null, user.username);
});
 
passport.deserializeUser(function(username, done) {
  // console.log('username',username)
  User.findOne({username: username}).exec((err, user)=> {
    // console.log(err,user)
    // if(err==undefined)
    //     done(null, user);
    // if(user==undefined)
    //     done(null,null)
    done(err, user);
  });
});
 
module.exports.http = {
 
  customMiddleware: function(app) {
    passport.use(new FacebookStrategy({
        clientID: "595958844103469", // Use your Facebook App Id
        clientSecret: "fdf804f40eed430e7fa6e82df8a00709", // Use your Facebook App Secret
        callbackURL: "https://localhost:1337/auth/facebook/callback",
        profileFields: ['email','id', 'first_name', 'gender', 'last_name','displayName', 'picture']

      }, verifyHandler));
    
      app.use(passport.initialize());
      app.use(passport.session());
  }
 
};