const bcryptjs = require('bcryptjs')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy;
const User = require('./../model/User')


module.exports = () => {
    passport.use(
        new passportLocal((username, password, done) => {
            User.findOne({ username: username }, (error, doc) => {
                if (error) {
                    throw error
                } else if (doc) {
                    bcryptjs.compare(password, doc.password, (error, res) => {
                        if (error) {
                            throw error;
                        } else {
                            if (res) {
                                return done(null, doc)
                            } else {
                                return done(null, false)
                            }
                        }
                    })
                } else {
                    return done(null, false)
                }
            })
        })
    )

    passport.serializeUser((user, cb)=>{
        cb(null, user.id)
    })
    passport.deserializeUser((id, cb)=>{
        User.findOne({_id:id}, (error, doc)=>{
            cb(error, doc)
        })
    })
}