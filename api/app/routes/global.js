/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <geoffreyharrazi@gmail.com>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
 
module.exports = function(router) {
    //------ LOAD CONTROLLER
    // --> No controller | just information

    var path = require('path'),
        Util = require('../helpers/appUtils');

    // --------------------------------------------------------------------------------------------------------------
    //                                                                                                  VERSION API
    // --------------------------------------------------------------------------------------------------------------
    // -------- HOMEPAGE
    router.get('/global/version', function(req, res){
        Util.info('Load API information');
        res.status(200).json(global.config.app);
    });

};