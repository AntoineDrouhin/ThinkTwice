/**
 * Created by aureliengarret on 30/06/2016.
 */

'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var questionController = require('../controllers/question'),
        auth               = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.get('/question',  auth.isAuth, questionController.getAll);

};