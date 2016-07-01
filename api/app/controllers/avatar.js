/**
 * Created by aureliengarret on 30/06/2016.
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

        //filename = req.icon_find._id + '_F.' + extension;  
        filename = '0000_F.' + extension;

        // --- Create a path to the image 
        var link = path.join(__dirname, '/../../data/icons/', filename);  
        fstream = fs.createWriteStream(link); 
        file.pipe(fstream);  
        fstream.on('close', function (error) { 
            if(error){ 
                console.log(error); 
                res.status(400).json({message : error}); 
            }else{ 
                // ----- Update the object to get the link 
                req.icon_find.update({file : filename}).exec(function(err){ 
                    res.status(200).json({link : global.config.app.url+ 'data/icons/'+filename}); 
                }); 
            }  
        }); 
    }); 
};