const express = require('express');
const router = express.Router();
const Portfolio = require('../../models/Portfolio');
const { isEmpty, uploadDir } = require('../../helpers/upload-helpers');
const PortfolioCategory = require('../../models/Portfolio-Category');

// set default admin layout router

router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'admin';
    next();

});

// get all portfolios

router.get('/', (req, res) => {

    Portfolio.find({})
        .populate('portfolio-category')
        .then(portfolios => {

        res.render('admin/portfolios/index', {portfolios: portfolios});

    });

});

// get new portfolio

router.get('/new', (req, res) => {

    PortfolioCategory.find({}).then(portfoliosCategories => {

        res.render('admin/portfolios/new', {portfoliosCategories: portfoliosCategories});

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

    const newPortfolio = Portfolio({

        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        category: req.body.category,
        file: filename

    });

    newPortfolio.save().then(savedPortfolio => {

        res.redirect('/admin/portfolios');

    });

});

// edit portfolio

router.get('/edit/:id', (req, res) => {

    Portfolio.findOne({_id: req.params.id})
        .then(portfolio => {

            PortfolioCategory.find({}).then(portfolioCategories =>{

                res.render('admin/portfolios/edit', {portfolio: portfolio, portfolioCategories: portfolioCategories});

            });


        });

});


router.put('/edit/:id', (req, res) => {

    Portfolio.findOne({_id: req.params.id})
        .then(portfolio => {

            portfolio.title = req.body.title;
            portfolio.description = req.body.description;
            portfolio.link = req.body.link;
            portfolio.category = req.body.category;

            if (!isEmpty(req.files)) {

                let file = req.files.file;
                filename = Date.now() + '-' + file.name;
                portfolio.file = filename;

                file.mv('./public/uploads/img/' + filename, (err) => {
                    if (err) throw err;
                });

            }

            portfolio.save().then(updatedPortfolio => {

                res.redirect('/admin/portfolios');
            });

        });

});

// delete portfolio

router.delete('/:id', (req, res) => {

    Portfolio.findOne({_id: req.params.id})
        .then(portfolio => {

            portfolio.remove().then(deletedPortfolio => {

                res.redirect('/admin/portfolios');

            });

        });

});

module.exports = router;

