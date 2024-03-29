/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <Geoffrey Harrazi>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
 
var PersonneController = exports;




//--------------------------------------- Module dependencies.

var     moment      = require('moment'),
        Utils        = require('../helpers/appUtils');
        Personne    = require("../models/personne.js");


PersonneController.register = function(req, res){

    var con = global.con();

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
    if(typeof bool == 'object'){
        res.status(200).json(bool);
    }
    if (!bool) {
        res.status(200).json({error: bool});
    } else {
        res.status(400).json({error: bool});
    }
};






