// ======================================================
// Person Main controller ===============================
// ======================================================
var PersonController = exports;


//--------------------------------------- Module dependencies.

var     moment      = require('moment'),
        Util        = require('../helpers/appUtils');


/**
 * Load all people
 * @param req
 * @param res
 */
PersonController.getAll = function(req, res){

    console.log("Test bdd")

    var query = "select * from thinktwice.loisir";


    var con = global.con();
    con.query(query,function(err,rows){
        console.log(err);
        if(err){
            res.status(200).json({error: true});
        }
        console.log('Data received from Db:\n');
        console.log(rows);

        res.status(200).json(rows);

    })

};

/**
 * Find a specific person from database
 * @param req
 * @param res
 * @param next
 * @param id
 */
PersonController.findPerson = function(req, res, next, id){


};
/**
 * Return person detail
 * @param req
 * @param res
 */
PersonController.getPerson = function(req, res){

};