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


/**
 * Load all people
 * @param req
 * @param res
 */
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

