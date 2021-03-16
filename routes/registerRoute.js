var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');


router.post('/', function(req, res) {
    console.log('register post');
    console.log('~req.body', req.body);
    let newUser = new User(
    { 
        username : req.body.username, 
        password: req.body.password 
    });

    // newUser.save()
    // .then(() => res.send(200))
    // .catch(err => console.log(err))

    let validationErrors = newUser.validateSync();
    console.log(validationErrors);
    console.log(req.body.password, req.body.repeatPassword);

    if (validationErrors === undefined && req.body.password === req.body.repeatPassword) {
        console.log('validation passed');
        //register user
        User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
            if (err) {
                console.log('getting user register error');
                console.log(err);
                res.send('Error:\n', err);

            } else {
                //authenticate the session with the user
                console.log('no registration error, registering and authenticating');
                passport.authenticate('local')(req, res, function () {
                    req.session.save(function(err) {
                        if (err) {
                            return next(err);
                        }
                        res.send(200);
                    });
                });
            }
        });

    } else {
        console.log('else');
        //we have errors

        //check for validation errors
        //check for password match error
        //then display all of them

        let displayErrors = [];

        if (validationErrors != undefined) {
            //grab validation errors
            let values = Object.values(validationErrors.errors);
            console.log('~Validation Errors:');
            values.forEach(err => {
                console.log(err.properties.path);
                console.log(err.properties.message);
                console.log('');
            });
            //add in validation errors
            displayErrors = values.map((err) => err.properties.path.charAt(0).toUpperCase() + err.properties.path.slice(1) + " " + err.properties.message);
        }

        if (req.body.password === req.body.repeatPassword) {
            console.log('passwords match');
        } else {
            //add on password not matching error
            displayErrors.push('Passwords do not match');
        }
        //render all the errors
        res.send(JSON.stringify(displayErrors));
        //res.render('register', {errors: displayErrors});
    }
});

module.exports = router;
