/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <Geoffrey Harrazi>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
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