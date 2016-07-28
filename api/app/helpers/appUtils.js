/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <geoffreyharrazi@gmail.com>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

//-------------------- App utilities
var appUtils = module.exports,
    moment   = require('moment');

appUtils.info = function(message, jsonObj)
{
    console.log('[' + global.pid + '][' + moment().format('YYYY.MM.DD HH:mm:ss') + '] INFO: ' + message);

    if ( jsonObj != null )
        console.log(exports.inspect(jsonObj));
};

appUtils.error = function(message, jsonObj)
{
    console.log('[' + global.pid + '][' + moment().format('YYYY.MM.DD HH:mm:ss') + '] ERROR: ' + message);

    if ( jsonObj != null ){
        console.log(exports.inspect(jsonObj));
    }
};

