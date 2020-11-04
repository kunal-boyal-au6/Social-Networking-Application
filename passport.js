const passport = require('passport')
const {Strategy : googleStrategy} = require('passport-google-oauth20') 
const {Strategy: FacebookStrategy } = require("passport-facebook");  
const User = require('./models/User')  


//GOOGLE STRATEGY
passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID ,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: "https://secure-river-06925.herokuapp.com/auth/google/redirect"
  },
   async (accessToken, refreshToken, profile, done)=> {
       try{
          const {_json: {email, name, picture}} = profile 
          let user = await User.findOne({email})
          if(!user)
          {
            user = await User.create({email,name,isThirdPartyUser : true,isConfirmed:true})
          }
         return done(null,user)
       }
       catch(err)
       {
        return done(err)
       }
  }
));



//FACEBOOK STRATEGY
const facebookOptions = {
    clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID, 
    clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
    callbackURL: `https://secure-river-06925.herokuapp.com/auth/facebook/redirect`,
    profileFields: ["id", "emails", "name"]
  };
  passport.use(
    new FacebookStrategy(
      facebookOptions,
      async (accessToken, refreshToken, facebookProfile, done) => {
        try {
          const {
            _json: { email, first_name, last_name }
          } = facebookProfile;
      
          let user = await User.findOne({ email });
          if (!user)
            user = await User.create({
              email,
              name: `${first_name} ${last_name}`,
              isThirdPartyUser: true,
              isConfirmed: true
            });
          return done(null, user);
        } catch (err) {
          console.log(err);
          if (err.name === "Error") {
            return done(err);
          }
        }
      }
    )
  );


 
