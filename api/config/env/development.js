'use strict';

module.exports = {

    // ---- Main app configuration
    app: {
        name        : 'My Resume API',
        url         : 'http://localhost:3000/',
        type        : 'Development',
        version     : 'TD3.0'
    },

    // ---- Database configuration
    db	: {
        module  : 'mongoDB',
        link      : "mongodb://163.172.150.53:27017/td2"
    },

    // ---- Params Allowed Origins by environment
    allowedOrigins : [ 'localhost:*', '0.0.0.0:*','127.0.0.1:*']
};


