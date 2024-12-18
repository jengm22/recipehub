const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require ("path");
const app = express();
const port = process.env.PORT || 3000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const routes = require('./server/routes/recipeRoutes.js');
const fileUpload = require('express-fileupload');
require('dotenv').config();

app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, ('public'))));
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret: 'CookingBlogSecretSession',
    saveUninitialized: true,
    resave: true,
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.use('/', routes);


app.listen(port, ()=> console.log(`Listening to port ${port}`));