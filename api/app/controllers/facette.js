/**
 * Created by aureliengarret on 01/07/2016.
 */
var FacetteController = exports;


//--------------------------------------- Module dependencies.

var     moment      = require('moment'),
        Utils        = require('../helpers/appUtils');


FacetteController.get = function(req, res){


    var query = "select * from facette";

    var con = global.con();

    con.query(query, function(err, rows) {
        if(err) {
            console.log(err);
            res.status(400).json({error : true});
            return;
        }

        res.status(200).json(rows);
    })

};