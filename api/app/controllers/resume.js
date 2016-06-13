// ======================================================
// RESUME Main controller ===============================
// ======================================================
var ResumeController = exports;


//--------------------------------------- Module dependencies.
var mongoose 	= require('mongoose'),
    Resume 		= mongoose.model('Resume'),
    Person 		= mongoose.model('Person'),
    Message 	= mongoose.model('Message'),
    moment      = require('moment'),
    Util        = require('../helpers/appUtils'),
    async       = require('async'),
    _           = require('lodash');

/**
 * Load all resumes
 * @param req
 * @param res
 */
ResumeController.getAll = function(req, res){

    Util.info('Load all resume');

    Resume.find({}).populate('person').exec(function(err, results){
        if(err){
            res.status(400).json({message : "Error Loading Resume"})
        }else{
            var resultsFormatted = [];

            async.forEach(results, function(result, callback){

                // --- Treatment about resume formatted
                resultsFormatted.push({
                    person : result.person,
                    message: result.message,
                    title  : result.title,
                    _id    : result._id
                });

                callback();

            },function(){
                res.status(200).json(resultsFormatted)
            })

        }
    })
};

/**
 * Find a specific resume from database
 * @param req
 * @param res
 * @param next
 * @param id
 */
ResumeController.findResume = function(req, res, next, id){

    Util.info('Find resume '+ id);

    Resume.findOne({_id : id}).exec(function(err, resume){
        // --- Manage error
        if(err){
            res.status(400).json({message : "Error Loading Resume"});
        }
        // --- Maybe no one found
        if(!resume){
            res.status(404).json({message : "Resume not found"});
        }else{
            // --- Load the person associated
            Person.findOne({_id : resume.person}).populate('contact.address').exec(function(err, person){
                resume.person = person;
                req.current_resume = resume;
                next();
            })
            
        }
    })
};
/**
 * Return resume detail
 * @param req
 * @param res
 */
ResumeController.getResume = function(req, res){
    Util.info('Get resume '+ req.current_resume._id);

    res.status(200).json(req.current_resume)
};