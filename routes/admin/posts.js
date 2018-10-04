const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

// set default admin layout router
router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();

});

router.get('/', (req, res) => {

    res.send('Its works');

});

router.get('/new', (req, res) => {

    res.render('admin/posts/new');

});

router.post('/new', (req, res) => {

    const newPost = Post({
       title: req.body.title,
       status: req.body.status,
       description: req.body.description
    });

    newPost.save()
        .then(savedPost => {

            res.redirect('/admin/posts')
        })

});


module.exports = router;