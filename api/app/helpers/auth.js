'use strict';

// ----- Load dependencies
var mongoose    = require('mongoose'),
    Utils       = require('./appUtils');
/**
 * Check if the current user is authenticated
 * @param req
 * @param res
 * @param next
 */
module.exports.isAuth = function(req, res, next){

    Utils.info('Check auth about user');

    var    User    = mongoose.model('User');

    // --- Find associated user in the database
    User.findByToken(req.headers.authorization,function(err, result){
        if(!err && result){
            req.current_user = result;
            next();
        }else{
            res.status(401).json({message : 'user not found'});
        }
    });
};