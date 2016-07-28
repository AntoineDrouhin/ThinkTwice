/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <geoffreyharrazi@gmail.com>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

module.exports = {

    // ---- Main app configuration
    app: {
        name        : 'ThinkTwice',
        url         : 'http://localhost:3000/',
        type        : 'Development',
        version     : '1.0'
    },

    // ---- Database configuration
    db	: {
        module  : 'mysql',
        url : "163.172.150.53",
        login : "ttrw",
        pwd : "ttRocks123",
        database : "thinktwice"
    },
    // ---- Params Allowed Origins by environment
    allowedOrigins : [ 'localhost:*', '0.0.0.0:*','127.0.0.1:*']
};


