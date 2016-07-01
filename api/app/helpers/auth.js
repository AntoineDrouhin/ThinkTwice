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

    console.log(req.headers.authorization);
    var token = req.headers.authorization;
    var query = "select count(*) as isAuth from personne where token = ?";
    var con = global.con();

    con.query(query, [token], function(err, rows) {
        console.log(rows);
        if (!err && rows.length && rows[0].isAuth) {
            if (new Date().getTime() - token <= 4*3600*1000) {
                next();
                return;
            }
        }
        res.status(401).json({autherror : true});

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