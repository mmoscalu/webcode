const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');
const translit = require('cyrillic-to-translit-js');
const {userAuth} = require('../../helpers/authentication');

// set default admin layout router
router.all('/*', userAuth, (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();

});

// get all categories

router.get('/', (req, res) => {

    Category.find({}).then(categories => {

        res.render('admin/categories/index', {categories: categories});

    });

});

// add new categories

router.post('/new', (req, res) => {

    const newCategory = Category({

        name: req.body.name,
        translitTitleCat: translit({ preset: "uk" }).transform(req.body.name.toLowerCase(), '-')

    });

    newCategory.save().then(savedCategory => {

        res.redirect('/admin/categories');

    });

});

// edit category

router.get('/edit/:id', (req, res) => {

    Category.findOne({translitTitleCat: req.params.id})
        .then(category => {

        res.render('admin/categories/edit', {category: category});

    });

});

router.put('/edit/:id', (req, res) => {

    Category.findOne({translitTitleCat: req.params.id})
        .then(category => {

            category.name = req.body.name;
            category.translitTitleCat = translit({ preset: "uk" }).transform(req.body.name.toLowerCase(), '-');

            category.save().then(savedCategory => {
                res.redirect('/admin/categories');
            });

        });

});

// delete category

router.delete('/:id', (req, res) => {

    Category.findOne({_id: req.params.id})
        .then(category => {

            category.remove().then(deletedCategory => {

                res.redirect('/admin/categories');

            });



        });

});

module.exports = router;