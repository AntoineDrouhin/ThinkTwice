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
    var ttmatchController = require('../controllers/ttmatch'),
        auth              = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.get('/personne/:id_p_cur/ttmatch', auth.isAuth, ttmatchController.getMatch);

    router.delete('/ttmatch/:id', auth.isAuth, ttmatchController.deleteMatch);

    router.param('id_p_cur', function(req,res,next,id){
        console.log(id);
        req.id_p_cur = id;
        next();
    } );

};