/**
 * Created by aureliengarret on 30/06/2016.
 */

var LoginController = exports;




//--------------------------------------- Module dependencies.

var     moment       = require('moment'),
        Utils        = require('../helpers/appUtils'),
        passwordHash = require('password-hash');



LoginController.connect = function(req, res){
    Utils.info("Connection needed");

    console.log(req.body);

    if (req.body) {
        var con = global.con();

        var query = "select count(*) as isok, id, mdp from personne where login = ?";

        con.query(query, [req.body.login], function(err, rows) {
            if (err || !rows[0].isok) {
                res.status(403).json({message : 'User not found'});
            }

            console.log(passwordHash.verify(req.body.mdp, rows[0].mdp));
            if (!passwordHash.verify(req.body.mdp, rows[0].mdp)) {
                res.status(403).json({message : 'Password false'});
            }

            var token = new Date().getTime();

            var update = "update personne set token = ? where id = ?";
            con.query(update, [token, rows[0].id], function(err, rows2) {
                res.status(200).json({"id": rows[0].id, "token" : token });
            })


        });
    } else {
        res.status(403).json({message : 'Parameter not found'});
    }


};

