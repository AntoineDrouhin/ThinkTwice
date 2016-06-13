// ====================================================
// Route Global  ======================================
// ====================================================

module.exports = function(router) {
    //------ LOAD CONTROLLER
    // --> No controller | just information

    var path = require('path'),
        Util = require('../helpers/appUtils');

    // --------------------------------------------------------------------------------------------------------------
    //                                                                                                  VERSION API
    // --------------------------------------------------------------------------------------------------------------
    // -------- HOMEPAGE
    router.get('/global/version', function(req, res){
        Util.info('Load API information');
        res.status(200).json(global.config.app);
    });

};