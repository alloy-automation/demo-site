var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session'); // Add this line

var indexRouter = require('./routes/index');

var app = express();

// Session Middleware
app.use(session({
    secret: 'your_secret_key', // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Compile SCSS to CSS using node-sass middleware
app.use(sassMiddleware({
    src: path.join(__dirname, 'public', 'stylesheets'),
    dest: path.join(__dirname, 'public', 'css'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css'
}));

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
