/**
 * Created by aureliengarret on 30/06/2016.
 */

'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var avatarController = require('../controllers/avatar'),
        auth              = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.post('/avatar/to/:id_dst', auth.isAuth, avatarController.upload);
    router.param('id_dst', function(req,res,next,id){
        req.dst = id;
        next();
    } );


};