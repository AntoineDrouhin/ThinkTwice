/**
 * Created by aureliengarret on 30/06/2016.
 */
// ======================================================
// Person Main controller ===============================
// ======================================================
var ReponseController = exports;



//--------------------------------------- Module dependencies.

var     moment          = require('moment'),
        Utils           = require('../helpers/appUtils');
        Personnalite    = require("../models/personnalite.js");
        Facette         = require("../models/facette.js");


/**
 * Load all people
 * @param req
 * @param res
 */
ReponseController.pushData = function(req, res){

    Utils.info("Form are pushed to the server.");

    if (req.body) {
        ReponseController.calcFacette(req.body.id_personne, req.body.reponses);
    } else {
        Utils.info("No body present in pushed data.");
    }
};

ReponseController.calcFacette = function(p, data) {
    var f = new Facette(p, data, ReponseController.calcPersonnalite);
    f.calc();
}

ReponseController.calcPersonnalite = function(p, data) {
    var p = new Personnalite(p, data);
    p.calc();
}

