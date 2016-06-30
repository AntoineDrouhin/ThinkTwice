/**
 * Created by aureliengarret on 30/06/2016.
 */
// ======================================================
// Person Main controller ===============================
// ======================================================
var QuestionController = exports;


//--------------------------------------- Module dependencies.

var     moment      = require('moment'),
        Util        = require('../helpers/appUtils');


/**
 * Load all people
 * @param req
 * @param res
 */
QuestionController.getAll = function(req, res){

    console.log("");

    // requete geo
    // id person, toute table question + réponse
    var query = "select id, libelle from question";

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