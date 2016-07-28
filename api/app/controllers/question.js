/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <geoffreyharrazi@gmail.com>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var QuestionController = exports;


//--------------------------------------- Module dependencies.

var     moment      = require('moment'),
        Utils        = require('../helpers/appUtils');


/**
 * Load all people
 * @param req
 * @param res
 */
QuestionController.getAll = function(req, res){

    var query = "select id, libelle from question";

    var con = global.con();
    con.query(query,function(err,rows){
        if(err){
            Utils.info(err);
            res.status(400).json({error: true});
            return;
        }
        Utils.info("All questions are requested and sended to client.")
        res.status(200).json(rows);
    })

};