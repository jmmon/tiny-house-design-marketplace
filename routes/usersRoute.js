var express = require('express');
var router = express.Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.route('/register').post((req, res) => {
    //client side validation first!

    console.log('register post');
    console.log('~req.body', req.body);
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const newUser = new User({ 
            email : req.body.email, 
            password: hash,
        });

        User.findOne({ email: req.body.email })
        .then(foundUser => {
            if (foundUser) {
                return res.status(401).json({
                    message: "Email already in use"
                });
            }

            newUser.save()
            .then(result => {
                if (!result) {
                    return res.status(500).json({
                        message: "Error creating user"
                    });
                }
                res.status(201).json({
                    message: "User created!",
                    result: result
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

    });
});

router.route('/login').post((req, res, next) => {
    let fetchedUser;
    console.log('~req.body', req.body)

    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Auth failed, no such user."
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        console.log(fetchedUser);
        if (!result) {
            return res.status(401).json({
                message: "Auth failed, incorrect password!"
            });
        }
        const token = jwt.sign(
            { email: fetchedUser.email, userId: fetchedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id
        });
    })
    .catch(e => {
        console.log(e);
    });
});

router.route('/logout').get((req, res, next) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;
