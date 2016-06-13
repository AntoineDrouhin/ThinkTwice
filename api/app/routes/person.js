
'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var personController = require('../controllers/person');

    // -------- Retrieve all person from the database
    router.get('/people',  personController.getAll);

    // -------- Retrieve a specific person
    router.get('/people/:id_person',  personController.getPerson);

    // -------- Params catching
    router.param('id_person', personController.findPerson);

};