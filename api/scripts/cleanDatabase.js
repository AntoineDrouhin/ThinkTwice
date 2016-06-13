'use strict';

// ------------------------------------------------------------ INIT ENVIRONNEMNT
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// -------- LOAD Dependencies
var fs 				= require('fs'),
    mongoose		= require('mongoose'),
    async           = require('async'),
    config          = require('../config/config');

// -------- Connect to database
var database = mongoose.connect(config.db.link);

console.log('Clean all elements from database');

// ------- LAUNCH IN PARALLEL ALL TASKS
async.parallel({
    // ---- TREATMENT ON TABLE PERSON
    person : function(callback){

        var person = require('../app/models/Person'),
            Person = mongoose.model('Person');

        Person.remove({}).exec(function(err, result){

            console.log('Clean all person');
            callback(null, 'done');

        })
    },
    // ---- TREATMENT ON TABLE ADDRESS
    address : function(callback){

        var address = require('../app/models/Address'),
            Address = mongoose.model('Address');

        Address.remove({}).exec(function(err, result){
            console.log('Clean all Address');
            callback(null, 'done');

        })
    },

    // ---- TREATMENT ON TABLE RESUME [ same as address ]
    resume : function(callback){

        var resume = require('../app/models/Resume'),
            Resume = mongoose.model('Resume');

        Resume.remove({}).exec(function(err, result){
            console.log('Clean all Resume');
            callback(null, 'done');

        })
    },

    // ---- TREATMENT ON TABLE Message [ same as address ]
    message : function(callback){

        var message = require('../app/models/Message'),
            Message = mongoose.model('Message');

        Message.remove({}).exec(function(err, result){
            console.log('Clean all Message');
            callback(null, 'done');

        })
    }

},function(err, results){

    console.log(results);

    // ----- Finish process
    process.exit();

});




