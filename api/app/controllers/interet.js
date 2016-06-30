/**
 * Created by aureliengarret on 30/06/2016.
 */
// ======================================================
// Person Main controller ===============================
// ======================================================
var InteretController = exports;


//--------------------------------------- Module dependencies.

var     moment      = require('moment'),
    Util        = require('../helpers/appUtils');
    Interet    = require("../models/interet.js");


InteretController.insert = function(req, res){

    if (req.body) {
        var p = new Interet();
        p.insert(req.body, res, InteretController.callBack);
    }
    else {
        res.status(400).json({error: true});
    }

};

InteretController.delete = function(req, res){

    if (req.body) {
        var p = new Interet();
        p.delete(req.body, res, InteretController.callBack);
    }
    else {
        res.status(400).json({error: true});
    }

};

InteretController.get = function(req, res){

    if (req.params.personneid) {
        var con = global.con();

        var query = "select * from interet where personneid = ?";

        con.query(query, req.params.personneid, function(err, rows) {
            if (err) {
                console.log(err);
                res.status(400).json({error: true});
                return;
            }

            if (!rows.length) {
                res.status(400).json({error : true});
                return;
            }

            res.status(200).json(rows);
        });
    }
    else {
        res.status(400).json({error: true});
    }

};

InteretController.callBack = function(res, bool) {
    if (bool) {
        res.status(200).json({error: bool});
    } else {
        res.status(400).json({error: bool});
    }

};