const express = require('express');
const app = express();
const path = require('path');
const expressHandlebars = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/web_design_db', {
    useNewUrlParser: true
})
    .then((db) => {
        console.log('Database conected ...')})
    .catch(error => console.log(error));

// add folder public
app.use(express.static(path.join(__dirname, 'public')));

// set View Engine

const {select} = require('./helpers/handlebars-helpers'); // get helpers function

app.engine('handlebars', expressHandlebars({defaultLayout: 'home', helpers: {select: select}}));
app.set('view engine', 'handlebars');

// set body parser

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Method Override

app.use(methodOverride('_method'));

// listen port
app.listen(4500, () => {
    console.log(`listen on port 4500`);
});

// add routes
const homeRoutes = require('./routes/home/home-routes');
const adminRoutes = require('./routes/admin/admin-routes');
const post = require('./routes/admin/posts');

// use routes

app.use('/', homeRoutes);
app.use('/admin', adminRoutes);
app.use('/admin/posts', post);