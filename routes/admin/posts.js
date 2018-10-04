const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

// set default admin layout router
router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();

});

router.get('/', (req, res) => {

    // get all posts

    Post.find({})
        .then(posts => {
            res.render('admin/posts', {posts: posts});
        });
});

router.get('/new', (req, res) => {

    res.render('admin/posts/new');

});

router.post('/new', (req, res) => {

    // get new post

    const newPost = Post({
       title: req.body.title,
       status: req.body.status,
       description: req.body.description
    });

    // save new post ob database

    newPost.save()
        .then(savedPost => {

            res.redirect('/admin/posts')
        })
        .catch(error => console.log('could not save post'));

});

router.get('/edit/:id', (req, res) => {

    Post.findOne({_id: req.params.id})
        .then(post => {
            res.render('admin/posts/edit', {post: post});
        });

});

router.put('/edit/:id', (req, res) => {

    Post.findOne({_id: req.params.id})
        .then(post => {

            post.title = req.body.title;
            post.status = req.body.status;
            post.description = req.body.description;

            post.save().then(updatedPost => {
               res.redirect('/admin/posts');
            });
        });

});

module.exports = router;