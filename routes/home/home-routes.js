const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const Portfolio = require('../../models/Portfolio');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// set default home layout router

router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'home';
    next();

});

router.get('/', (req, res) => {

    Post.find({}).then(posts => {

        Category.find({}).then(categories => {

            Portfolio.find({}).then(portfolios => {

                res.render('home/index', {
                    posts: posts,
                    categories: categories,
                    portfolios: portfolios
                });

            });

        });

    });

});

router.get('/post/:slug', (req, res) => {

    Post.findOne({slug: req.params.slug})
        .then(post => {

            Category.find({}).then(categories =>{

                res.render('home/post', {post: post, categories: categories});

            });

        });
});

router.get('/services', (req, res) => {
    res.render('home/services');
});

router.get('/portfolio', (req, res) => {

    Portfolio.find({}).then(portfolios => {

        res.render('home/portfolio', {portfolios: portfolios})

    });

});

router.get('/about', (req, res) => {
    res.render('home/about');
});

router.get('/contacts', (req, res) => {
    res.render('home/contacts');
});



// app login

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {

    User.findOne({email: email}).then(user => {

        if (!user) return done(null, false, {message: 'Користувача не знайдено'});

        bcrypt.compare(password, user.password, (err, matched) => {

            if (err) return err;

            if (matched) {

                return done(null, user);

            }  else {

                return done(null, false, {message: 'Пароль не вірний'});

            }

        })

    })

}));

passport.serializeUser(function(user, done) {

    done(null, user.id);

});

passport.deserializeUser(function(id, done) {

    User.findById(id, function(err, user) {

        done(err, user);

    });
});


router.get('/login', (req, res) => {

    res.render('home/login');

});

router.post('/login', (req, res, next) => {

    passport.authenticate('local', {

        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true

    })(req, res, next);

});

router.get('/logout', (req, res) => {

    req.logout();
    res.redirect('/');

});

module.exports = router;