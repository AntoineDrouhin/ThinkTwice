/**
 * Created by aureliengarret on 30/06/2016.
 */

'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var facetteController = require('../controllers/facette'),
        auth              = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.get('/facette', auth.isAuth, facetteController.get);

};