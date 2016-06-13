// ======================================================
// Person Main controller ===============================
// ======================================================
var PersonController = exports;


//--------------------------------------- Module dependencies.
var mongoose 	= require('mongoose'),
    Person 		= mongoose.model('Person'),
    moment      = require('moment'),
    Util        = require('../helpers/appUtils');


/**
 * Load all people
 * @param req
 * @param res
 */
PersonController.getAll = function(req, res){

    Util.info('Load all people');

    Person.find({}).populate('contact.address').exec(function(err, results){
        if(err){
            res.status(400).json({message : "Error Loading Person"})
        }else{
            res.status(200).json(results)
        }
    })
};

/**
 * Find a specific person from database
 * @param req
 * @param res
 * @param next
 * @param id
 */
PersonController.findPerson = function(req, res, next, id){

    Util.info('Find person '+ id);

    Person.findOne({_id : id}).populate('contact.address').exec(function(err, person){
        // --- Manage error
        if(err){
            res.status(400).json({message : "Error Loading Person"});
        }
        // --- Maybe no one found
        if(!person){
            res.status(404).json({message : "Person not found"});
        }else{
            req.current_person = person;
            next();
        }
    })
};
/**
 * Return person detail
 * @param req
 * @param res
 */
PersonController.getPerson = function(req, res){
    Util.info('Get person '+ req.current_person);

    res.status(200).json(req.current_person)
};