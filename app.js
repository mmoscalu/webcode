const express = require('express');
const app = express();
const path = require('path');
const expressHandlebars = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');

// listen port
app.listen(4500, () => {
    console.log(`listen on port 4500`);
});

// connect db

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/web_design_db', {
    useNewUrlParser: true
})
    .then((db) => {
        console.log('Database conected ...')})
    .catch(error => console.log(error));

// add folder public

app.use(express.static(path.join(__dirname, 'public')));

// set view engine

const {select} = require('./helpers/handlebars-helpers'); // get helpers function

app.engine('handlebars', expressHandlebars({defaultLayout: 'home', helpers: {select: select}}));
app.set('view engine', 'handlebars');

// set uploads middleware

app.use(upload());

// set body parser

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// method override

app.use(methodOverride('_method'));

// add routes
const homeRoutes = require('./routes/home/home-routes');
const adminRoutes = require('./routes/admin/admin-routes');
const post = require('./routes/admin/posts');

// use routes

app.use('/', homeRoutes);
app.use('/admin', adminRoutes);
app.use('/admin/posts', post);