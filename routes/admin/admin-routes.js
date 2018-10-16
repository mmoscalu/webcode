const express = require('express');
const router = express.Router();
const {userAuth} = require('../../helpers/authentication');
const Post = require('../../models/Post');


// set default admin layout router
router.all('/*', userAuth, (req, res, next) => {

   req.app.locals.layout = 'admin';
   next();

});

router.get('/', (req, res) => {

    Post.countDocuments({}).then(postCount => {

        res.render('admin/index', {postCount: postCount});

    });

});


module.exports = router;