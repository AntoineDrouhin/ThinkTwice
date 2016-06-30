/**
 * Created by aureliengarret on 30/06/2016.
 */
// ======================================================
// Person Main controller ===============================
// ======================================================
var PersonneController = exports;




//--------------------------------------- Module dependencies.

var     moment      = require('moment'),
        Util        = require('../helpers/appUtils');
        Personne    = require("../models/personne.js");


PersonneController.register = function(req, res){

    if (req.body) {
        var p = new Personne();
        p.insert(req.body, res, PersonneController.callBack);
    }
    else {
        res.status(400).json({error: true});
    }

};

PersonneController.update = function(req, res){

    if (req.body) {
        var p = new Personne();
        p.update(req.body, res, PersonneController.callBack);
    }
    else {
        res.status(400).json({error: true});
    }

};

PersonneController.get = function(req, res){

    if (req.params.id) {
        var con = global.con();

        var query = "select * from personne where id =  ?";
        con.query(query, req.params.id, function(err, rows) {
            if (err) {
                console.log(err);
                res.status(400).json({error : true});
                return;
            }
            if (!rows.length) {
                res.status(400).json({error : true});
                return;
            }

            res.status(200).json(rows);

        })
    }
    else {
        res.status(400).json({error: true});
    }

};

PersonneController.callBack = function(res, bool) {
    if (!bool) {
        res.status(200).json({error: bool});
    } else {
        res.status(400).json({error: bool});
    }
};






