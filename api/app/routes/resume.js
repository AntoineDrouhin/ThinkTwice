
'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var resumeController = require('../controllers/resume'),
        auth = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.get('/resumes',resumeController.getAll);

    // -------- Retrieve a specific resumes
    router.get('/resumes/:id_resume',resumeController.getResume);

    // -------- Params catching
    router.param('id_resume', resumeController.findResume);

};