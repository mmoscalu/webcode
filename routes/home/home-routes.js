const express = require('express');
const router = express.Router();

// set default home layout router

router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'home';
    next();

});

router.get('/', (req, res) => {
    res.render('home/index');
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

router.get('/login', (req, res) => {
    res.render('home/login');
});

module.exports = router;