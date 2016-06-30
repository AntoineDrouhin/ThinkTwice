/**
 * Created by aureliengarret on 30/06/2016.
 */

'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var loginController = require('../controllers/login'),
        auth              = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.post('/login', loginController.connect);

};