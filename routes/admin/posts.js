const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const { isEmpty, uploadDir } = require('../../helpers/upload-helpers');
const fs = require('fs');
const translit = require('cyrillic-to-translit-js');
const {userAuth} = require('../../helpers/authentication');

// set default admin layout router

router.all('/*', userAuth, (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();

});

// get all posts

router.get('/', (req, res) => {

    Post.find({})
        .populate('category')
        .then(posts => {
            res.render('admin/posts', {posts: posts});
        });
});

// get new post

router.get('/new', (req, res) => {

    Category.find({}).then(categories => {

        res.render('admin/posts/new', {categories: categories});

    });

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
            category: req.body.category,
            status: req.body.status,
            description: req.body.description,
            file: filename,
            translitTitle: translit({ preset: "uk" }).transform(req.body.title.toLowerCase(), '-')
        });

        // save new post ob database

        newPost.save()
            .then(savedPost => {

                req.flash('success_message', `Запис ${savedPost.title} створенний успішно`);

                res.redirect('/admin/posts')
            })
            .catch(error => console.log('could not save post'));

});

// edit post

router.get('/edit/:slug', (req, res) => {

    Post.findOne({slug: req.params.slug})
        .then(post => {

            Category.find({}).then(categories => {

                res.render('admin/posts/edit', {post: post, categories: categories});

            });
        });

});

router.put('/edit/:slug', (req, res) => {

    Post.findOne({slug: req.params.slug})
        .then(post => {

            post.title = req.body.title;
            post.category = req.body.category;
            post.status = req.body.status;
            post.description = req.body.description;
            post.translitTitle = translit({ preset: "uk" }).transform(req.body.title.toLowerCase(), '-');

            if (!isEmpty(req.files)) {

                let file = req.files.file;
                filename = Date.now() + '-' + file.name;
                post.file = filename;

                file.mv('./public/uploads/img/' + filename, (err) => {
                    if (err) throw err;
                });

            }

            post.save().then(updatedPost => {

                req.flash('success_message', `Запис ${post.title} успішно оновленно`);

                res.redirect('/admin/posts');

            });
        });

});

// delete post

router.delete('/:id', (req, res) => {

   Post.findOne({_id: req.params.id})
       .then(post => {

           fs.unlink(uploadDir + post.file, (err) => {
               post.remove().then(deletedPost => {

                   req.flash('success_message', `Запис ${post.title} успішно видаленно`);
                   res.redirect('/admin/posts');

               });

           });

       })
});



module.exports = router;