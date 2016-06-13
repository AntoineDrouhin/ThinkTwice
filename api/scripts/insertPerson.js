'use strict';

// ------------------------------------------------------------ INIT ENVIRONNEMNT
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// ----- 0 LOAD DEPENDENCIES
var fs 				= require('fs'),
    mongoose		= require('mongoose'),
    async           = require('async'),
    config          = require('../config/config'),
    util            = require('util'),
    moment          = require('moment');

// --- Model associated
var person          = require('../app/models/Person'),
    address         = require('../app/models/Address'),
    resume          = require('../app/models/Resume'),
    message         = require('../app/models/Message');


var Person          = mongoose.model('Person'),
    Address         = mongoose.model('Address'),
    Resume          = mongoose.model('Resume'),
    Message          = mongoose.model('Message');

// -------- Connect to database
var database = mongoose.connect(config.db.link);

// ----- 1 Read the file ../data/list-l3-classique-resume.json
fs.readFile('scripts/data/l3-app.json', function(err, data)  {

    if (err) {
        throw err;
        process.exit();
    }

    async.eachSeries(JSON.parse(data), function(raw, callback){

        // ------- Create Object Associated
        // -- Address
        var myAddress = new Address(raw.person.contact.address);
        // -- Person
        var myPerson  = new Person(raw.person);
        myPerson.contact.address = myAddress;


        // -- Resume
        var myResume = new Resume(raw.resume);
        myResume.person = myPerson;

        // -- Message
        var myMessage = new Message(raw.message);




        // ------- Record asynchronous all information into database
        async.parallel({

            address : function(callbackRecord){
                myAddress.save(function(err, result){
                    callbackRecord(err, result);
                })
            },

            person : function(callbackRecord){
                myPerson.save(function(err, result){
                    callbackRecord(err, result);
                })
            },

            resume : function(callbackRecord){
                myResume.save(function(err, result){
                    callbackRecord(err, result);
                })
            }
            /*message : function(callbackRecord){
                myMessage.save(function(err, result){
                    callbackRecord(err, result);
                })
            }*/

        }, function(err, result){

            if(err){
                console.log("Error during recording "+myPerson.name);
                console.log(err);
            }
            callback();
        });


    },function(){
        console.log('finish');
        process.exit();
    })
});


// https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback

// ----- 2 For each object into the file
// - Create a new Person / Address / Resume with data associated
// - Save Person / Address / Resume
