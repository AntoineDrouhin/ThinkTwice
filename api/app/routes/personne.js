/**
 * Created by aureliengarret on 30/06/2016.
 */

'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var personneController = require('../controllers/personne'),
        auth              = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.post('/personne', auth.isAuth, personneController.register);

    router.put('/personne', auth.isAuth, personneController.update);

};