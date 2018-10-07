const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const User = require('../../models/User');

// set default home layout router

router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'home';
    next();

});

router.get('/', (req, res) => {

    Post.find({}).then(posts => {

        Category.find({}).then(categories => {

            res.render('home/index', {posts: posts, categories: categories});

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
    res.render('home/portfolio');
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

    newUser.save().then(savedUser => {

        res.redirect('/');

    });



});

router.get('/login', (req, res) => {
    res.render('home/login');
});

module.exports = router;