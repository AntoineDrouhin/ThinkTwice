/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <geoffreyharrazi@gmail.com>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var avatarController = require('../controllers/avatar'),
        auth              = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.post('/avatar/to/:id_dst', auth.isAuth, avatarController.upload);

    router.get('/avatar/from/:id_src', auth.isAuth, avatarController.download);

    router.get('/data/avatar/:file',  avatarController.binary);

    router.param('id_dst', function(req,res,next,id){
        req.dst = id;
        next();
    } );


};