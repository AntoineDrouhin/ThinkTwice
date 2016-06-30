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
        p.insert(req.body, res, PersonneController.registerCallBack);
    }
    else {
        res.status(200).json({error: true});
    }

};

PersonneController.registerCallBack = function(res, bool) {
    res.status(200).json({error: bool});
};



PersonneController.update = function(req, res){

    if (req.body) {
        var p = new Personne();
        p.update(req.body, res, PersonneController.updateCallBack);
    }
    else {
        res.status(200).json({error: true});
    }

};

PersonneController.updateCallBack = function(res, bool) {
    res.status(200).json({error: bool});
};

