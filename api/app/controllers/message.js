/**
 * Created by Geoffrey on 27/05/2016.
 */
// ======================================================
// Message Main controller ===============================
// ======================================================
var MessageController = exports;


//--------------------------------------- Module dependencies.
var mongoose 	= require('mongoose'),
    Message 	= mongoose.model('Message'),
    moment      = require('moment'),
    Util        = require('../helpers/appUtils'),
    async       = require('async'),
    _           = require('lodash');


/**
 * Load all message with resume id
 * @param req
 * @param res
 */
MessageController.getAll = function(req, res){

    Util.info('Load all Message for resume '+req.params.resumeId);

    Message.find({resume : req.params.resumeId}).exec(function(err, results){
        if(err){
            res.status(400).json({message : "Error Loading Message"})
        }else{
            var resultsFormatted = [];

            async.forEach(results, function(result, callback){

                // --- Treatment about message formatted
                resultsFormatted.push({
                    nom : result.nom,
                    date: result.date,
                    textMessage  : result.textMessage
                });

                callback();

            },function(){
                res.status(200).json(resultsFormatted)
            })

        }
    })
};

/**
 * Return message detail
 * @param req
 * @param res
 */
MessageController.getMessage = function(req, res){
    Util.info('Get message '+ req.current_message);

    res.status(200).json(req.current_message)
};

MessageController.insertMessage = function(req, res) {
    Util.info('Insert message');

    var post = new Message({
        "nom" : req.params.name,
        "date": moment().format('MM/DD/YYYY'),
        "textMessage" : req.params.msg,
        "resume" : req.params.resume
    });

    post.save(function(err) {
        if(err){
            res.status(400).json({message : "Error saving message"});
        }

        else {
            res.status(200).json({message : "Ok saving message"});
        }
    });

    


}




MessageController.ok = function(err, numAffected) {
    Util.info(err);
    Util.info(numAffected);
}

