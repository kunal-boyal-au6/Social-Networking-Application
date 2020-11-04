const express = require('express');
const router = express.Router()
const passport = require('passport');
const {fetchUserFromGoogle , fetchUserFromFacebook} = require('../controllers/oauthController')

router.get('auth/google', passport.authenticate('google', { scope: ['profile','email'] , session: false }))


router.get('auth/google/redirect', passport.authenticate('google', { failureRedirect: "http://localhost:1234/#login", 
 session: false }), fetchUserFromGoogle)

router.get('auth/facebook', passport.authenticate('facebook', { scope: ['email'] , session: false }))


router.get('auth/facebook/redirect', passport.authenticate('facebook', { failureRedirect: "http://localhost:1234/#login", 
 session: false }), fetchUserFromFacebook)


module.exports = router