/**
 * Created by Geoffrey on 7/1/2016.
 */

var TtmatchController = exports;



//--------------------------------------- Module dependencies.

var     moment          = require('moment'),
    Utils           = require('../helpers/appUtils');
Ttmatch    = require("../models/ttmatch.js");



/**
 * Load all people
 * @param req
 * @param res
 */
TtmatchController.pushData = function(req, res){

    Utils.info("Form are pushed to the server.");

    if (req.body) {
        TtmatchController.matching(req.body.id_personne);
    } else {
        Utils.info("No body present in pushed data.");
    }
};

TtmatchController.matching = function(p, data) {
    var t = new Ttmatch(p, data);
    t.matching();
}

