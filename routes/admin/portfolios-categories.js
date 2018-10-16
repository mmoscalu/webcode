const express = require('express');
const router = express.Router();
const PortfolioCategory = require('../../models/Portfolio-Category');
const {userAuth} = require('../../helpers/authentication');

// set default admin layout router
router.all('/*', userAuth, (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();

});

// get all categories

router.get('/', (req, res) => {

    PortfolioCategory.find({}).then(portfolioCategories => {

        res.render('admin/portfolios-categories/index', {portfolioCategories: portfolioCategories});

    });

});
// add new categories

router.post('/new', (req, res) => {

    const newPortfolioCategory = PortfolioCategory ({

        name: req.body.name

    });

    newPortfolioCategory.save().then(savedCategory => {

        res.redirect('/admin/portfolios-categories');

    });

});

// edit category

router.get('/edit/:id', (req, res) => {

    PortfolioCategory.findOne({_id: req.params.id})
        .then(portfolioCategory => {

            res.render('admin/portfolios-categories/edit', {portfolioCategory: portfolioCategory});

        });

});

router.put('/edit/:id', (req, res) => {

    PortfolioCategory.findOne({_id: req.params.id})
        .then(portfolioCategory => {

            portfolioCategory.name = req.body.name;

            portfolioCategory.save().then(savedPortfolioCategory => {
                res.redirect('/admin/portfolios-categories');
            });

        });

});

// delete category

router.delete('/:id', (req, res) => {

    PortfolioCategory.findOne({_id: req.params.id})
        .then(portfolioCategory => {

            portfolioCategory.remove().then(deletedPortfolioCategory => {

                res.redirect('/admin/portfolios-categories');

            });

        });

});


module.exports = router;