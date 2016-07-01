/**
 * Created by aureliengarret on 01/07/2016.
 */

'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var ttmatchController = require('../controllers/ttmatch'),
        auth              = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.get('/personne/:id/ttmatch', auth.isAuth, ttmatchController.getMatch);

};