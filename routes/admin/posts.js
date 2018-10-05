const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const { isEmpty, uploadDir } = require('../../helpers/upload-helpers');
const fs = require('fs');
// const path = require('path');

// set default admin layout router

router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();

});

// get all posts

router.get('/', (req, res) => {

    Post.find({})
        .then(posts => {
            res.render('admin/posts', {posts: posts});
        });
});

// get new post

router.get('/new', (req, res) => {

    res.render('admin/posts/new');

});

router.post('/new', (req, res) => {

    let filename = '';

    if (!isEmpty(req.files)) {

        let file = req.files.file;
        filename = Date.now() + '-' + file.name;

        file.mv('./public/uploads/img/' + filename, (err) => {
            if (err) throw err;
        });

    }

    const newPost = Post({
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
        file: filename
    });

    // save new post ob database

    newPost.save()
        .then(savedPost => {

            res.redirect('/admin/posts')
        })
        .catch(error => console.log('could not save post'));

});

// edit post

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

// delete post

router.delete('/:id', (req, res) => {

   Post.findOne({_id: req.params.id})
       .then(post => {

           fs.unlink(uploadDir + post.file, (err) => {
               post.remove();
               res.redirect('/admin/posts');
           });

       })
});



module.exports = router;