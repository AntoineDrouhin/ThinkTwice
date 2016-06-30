/**
 * Created by aureliengarret on 30/06/2016.
 */
// ======================================================
// Person Main controller ===============================
// ======================================================
var QuestionController = exports;


//--------------------------------------- Module dependencies.

var     moment      = require('moment'),
        Utils        = require('../helpers/appUtils');


/**
 * Load all people
 * @param req
 * @param res
 */
QuestionController.getAll = function(req, res){

    var query = "select id, libelle from question";

    var con = global.con();
    con.query(query,function(err,rows){
        if(err){
            Utils.info(err);
            res.status(400).json({error: true});
            return;
        }
        Utils.info("All questions are requested and sended to client.")
        res.status(200).json(rows);
    })

};