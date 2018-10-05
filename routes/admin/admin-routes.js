const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const faker = require('faker');


// set default admin layout router
router.all('/*', (req, res, next) => {

   req.app.locals.layout = 'admin';
   next();

});

router.get('/', (req, res) => {

    res.render('admin/index');

});

// generate fake post

router.post('/generate-fake-posts', (req, res) => {

    for (let i =0; i <req.body.amount; i++) {

        let post = new Post();

        post.title = faker.name.title();
        post.status = 'public';
        post.description = faker.lorem.paragraph();

        post.save( function (err) {
            if (err) throw err;
        });

    }

    res.redirect('/admin/posts');

});

module.exports = router;