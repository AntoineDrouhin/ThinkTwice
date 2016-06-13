'use strict';

var path 		= require('path');
var rootPath 	= path.normalize(__dirname + '/../..');

module.exports 	= {
    root			: rootPath,
    appRoot			: rootPath + '/app',
    port			: process.env.PORT || 3000,
    db				: process.env.MONGOHQ_URL,
    templateEngine	: 'swig',

    // The secret is used to compute a session hash
    sessionSecret	: '!!2!TD_API!09!!',
    // The name of the MongoDB collection to store sessions in
    sessionCollection: 'sessions',

    // ---- Params Allowed Origins by environment
    allowedOrigins : [ 'localhost:*', '0.0.0.0:*','127.0.0.1:*']
};