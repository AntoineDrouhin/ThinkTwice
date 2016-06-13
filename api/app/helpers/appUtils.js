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

