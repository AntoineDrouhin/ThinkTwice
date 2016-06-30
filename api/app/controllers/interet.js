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
        res.status(200).json({error: true});
    }

};

InteretController.delete = function(req, res){

    if (req.body) {
        var p = new Interet();
        p.delete(req.body, res, InteretController.callBack);
    }
    else {
        res.status(200).json({error: true});
    }

};

InteretController.callBack = function(res, bool) {
    res.status(200).json({error: bool});
};