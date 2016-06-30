/**
 * Created by aureliengarret on 30/06/2016.
 */

'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var interetController = require('../controllers/interet'),
        auth              = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.post('/interet', auth.isAuth, interetController.insert);

    router.delete('/interet', auth.isAuth, interetController.delete);

    router.get('/interet/:personneid', auth.isAuth, interetController.get);

};