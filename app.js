const express = require('express');
const bodyParser = require ('body-parser');
const errorHandler= require ('./error-handler');
const app = express();

/**
    * Middleware
    */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/**
    * Register the routes
    */

app.use('/pdf2json', require('./pdf2jsonController'));



// global error handler
app.use(errorHandler);

module.exports=  app;