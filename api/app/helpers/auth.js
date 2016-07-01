'use strict';

// ----- Load dependencies

var     Utils       = require('./appUtils');
/**
 * Check if the current user is authenticated
 * @param req
 * @param res
 * @param next
 */
module.exports.isAuth = function(req, res, next){

    Utils.info('Check auth about user');

    var token = req.header.Authorization;
    var query = "select count(*) as isAuth from personne where token = ?";
    var con = global.con();

    con.query(query, [token], function(err, rows) {
        if (rows.length && rows[0].isAuth) {
            if (new Date().getTime() - token <= 4*3600*1000) {
                next();
                return;
            }
        }
        else {
            res.status(401).json({message : 'user not found'});
        }
    });



    // var    User    = mongoose.model('User');
    //
    // // --- Find associated user in the database
    // User.findByToken(req.headers.authorization,function(err, result){
    //     if(!err && result){
    //         req.current_user = result;
    //         next();
    //     }else{
    //         res.status(401).json({message : 'user not found'});
    //     }
    // });
};