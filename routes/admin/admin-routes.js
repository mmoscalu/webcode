const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');


// set default admin layout router
router.all('/*', (req, res, next) => {

   req.app.locals.layout = 'admin';
   next();

});

router.get('/', (req, res) => {

    res.render('admin/index');

});


module.exports = router;