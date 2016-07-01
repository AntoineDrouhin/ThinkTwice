/**
 * Created by aureliengarret on 01/07/2016.
 */

'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var ttmatchController = require('../controllers/ttmatch'),
        auth              = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.get('/personne/:id_p_cur/ttmatch', auth.isAuth, ttmatchController.getMatch);

    router.param('id_p_cur', function(req,res,next,id){
        console.log(id);
        req.id_p_cur = id;
        next();
    } );

};