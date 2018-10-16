const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const {userAuth} = require('../../helpers/authentication');

// set default admin layout router
router.all('/*', userAuth, (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();

});

router.get('/', (req, res) => {

    User.find({}).then(users => {

        res.render('admin/users/index', {users: users});

    });

});

router.get('/register', (req, res) => {

    res.render('admin/users/register');

});

router.post('/register', (req, res) => {

    if (req.body.password === req.body.passwordConfirm) {


        User.findOne({email: req.body.email})
            .then( user => {

                if (!user) {

                    const newUser = new User({

                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password

                    });

                    bcrypt.genSalt(10, (err, salt) => {

                        bcrypt.hash(newUser.password, salt, (err, hash) => {

                            newUser.password = hash;



                            newUser.save().then(savedUser => {

                                req.flash('success_message', 'Ви зареєстровані, будь ласка увійдіть');

                                res.redirect('/admin/users');

                            });

                        })

                    });


                } else {

                    req.flash('errors_message', `Данний e-mail - ${req.body.email} вже зареєстрований`);

                    res.redirect('/admin/users');

                }

            });


    } else {

        req.flash('errors_message', `Паролі не співпадають`);

        res.redirect('/admin/users/register');

    }

});






module.exports = router;