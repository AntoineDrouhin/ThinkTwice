/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <Geoffrey Harrazi>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var AvatarController = exports;


//--------------------------------------- Module dependencies.

var     moment = require('moment'),
        Utils = require('../helpers/appUtils'),
        path        = require('path'),
        fs          = require('fs');


AvatarController.upload = function (req, res) {
    //Utils.info('Updload icon file to ' + req.icon_find._id + ' by ' + req.current_user.id);
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        Utils.info('Updload icon file to ' + filename);  
        // --- Transform the file name 
        var extension = filename.split('.');
        extension = extension[extension.length - 1];


        filename = new Date().getTime() + '_F.' + extension;

        // --- Create a path to the image 
        var link = path.join(__dirname, '/../../data/avatar/', filename);  
        fstream = fs.createWriteStream(link); 
        file.pipe(fstream);  
        fstream.on('close', function (error) { 
            if(error){ 
                console.log(error); 
                res.status(400).json({message : error}); 
            }else{ 
                // ----- Update the object to get the link 

                var insert = "update personne set photoPath = ? where id = ?";

                var con = global.con();

                var relPath = 'data/avatar/'+filename;
                con.query(insert,[relPath, req.dst], function(err, rows) {
                    if (err) {
                        res.status(400).json({error : true});
                    }
                    res.status(200).json({link : global.config.app.url+ relPath});

                });

            }  
        }); 
    }); 
};

AvatarController.download = function (req, res) {
    console.log("Download image");
    if (req.params.id_src) {
        var query = "select photoPath from personne where id = ?";
        var con = global.con();
        con.query(query, req.params.id_src, function(err, rows) {
            console.log(rows);
            if (err || !rows.length) {
                res.status(404).json({"error": true});
                return;
            }
            var datalink = (rows[0].photoPath == null) ? "data/avatar/placeholder.png" : rows[0].photoPath;

            res.status(200).json({link : global.config.app.url+ datalink});
            return;

        })
    } else {
        res.status(404).json({"error": true});
    }
};

AvatarController.binary = function (req, res) {
    console.log(req.params.file);
    var img = fs.readFileSync( path.join(__dirname, '/../../data/avatar/', req.params.file));
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
}
