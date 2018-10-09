const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const Portfolio = require('../../models/Portfolio');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

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

router.get('/post/:id', (req, res) => {

    Post.findOne({translitTitle: req.params.id})
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

router.get('/register', (req, res) => {

    res.render('home/register');

});

router.post('/register', (req, res) => {

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

                res.redirect('/login');

            });

        })

    });

});

router.get('/login', (req, res) => {
    res.render('home/login');
});

module.exports = router;