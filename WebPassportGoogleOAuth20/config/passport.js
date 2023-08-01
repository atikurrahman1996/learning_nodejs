require("dotenv").config();
const User = require("../models/user.model");
const passport = require("passport");
const bcrypt = require("bcrypt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({ googleId: profile.id });

        //if user not found, create new user

        if (!user) {
          let newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
          });
          await newUser.save();
          return cb(null, newUser);
        } else {
          //if user found, return user

          return cb(null, user);
        }
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
