/**
 * Module dependencies.
 */
var express 	= require('express'),
    consolidate = require('consolidate'),
    flash 		= require('connect-flash'),
    helpers 	= require('view-helpers'),
    config 		= require('./config'),
    //session		= require('express-session'),
    //mongoStore	= require('connect-mongo')(session),
    busboy      = require('connect-busboy');

// ----- Middleware Express
var compression     = require('compression'),
    methodOverride  = require('method-override'),
    logger          = require('morgan'),
    bodyParser      = require('body-parser'),
    cors            = require('express-cors');

// ----- Configuration
var config          = require('./config');

module.exports = function(app,db) {
    app.set('showStackError', true);

    // Prettify HTML
    app.locals.pretty = true;
    // cache=memory or swig dies in NODE_ENV=production
    app.locals.cache = 'memory';

    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(compression({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development') {
        app.use(logger('dev'));
    }

    // assign the template engine to .html files
    //app.engine('html', consolidate[config.templateEngine]);

    // set .html as the default extension
    //app.set('view engine', 'html');

    // Set views path, template engine and default layout
    //app.set('views', config.root + '/app/views');

    // Enable jsonp
    app.enable('jsonp callback');


    //------ MIDDLEWARE

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.raw());
    app.use(bodyParser.text());
    app.use(busboy());
    app.use(methodOverride());

    // Dynamic helpers
    app.use(helpers(config.app.name));


    // Connect flash for flash messages
    app.use(flash());

    // Cross Domains Allowed
    app.use(cors({
        allowedOrigins  : config.allowedOrigins,
        headers         : ['X-Requested-With', 'Content-Type', 'Authorization']
    }));

};


