const bcrypt = require('bcryptjs');
const User = require('../models/user')
const passport = require('passport')

module.exports.login =
    (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) throw err;
            if (!user) res.send("No User Exists");
            else {
                req.logIn(user, (err) => {
                    if (err) throw err;
                    res.send("Successfully Authenticated");
                    console.log(req.user);
                });
            }
        })(req, res, next);
    }


module.exports.register =
    (req, res) => {
        User.findOne({ username: req.body.username }, async (err, doc) => {
            if (err) throw err;
            if (doc) res.send("A User Already Exists With That Email")
            if (!doc) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10)

                const newUser = new User({
                    username: req.body.username,
                    password: hashedPassword
                });
                await newUser.save();
                res.send("User Created")
            }
        })
    }
