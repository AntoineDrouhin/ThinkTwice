//------ Model RESUME
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema,
    async       = require('async'),
    moment      = require('moment');

//------------------------------------------- Person Schema
var ResumeSchema = new Schema({

    // --- Relation with a person
    person : { type : Schema.Types.ObjectId, ref: 'Person' },

    // --- Resume Title
    title        : String,

    // --- List of experiences
    experiences : [{
        "start"     : String,
        "end"       : String,
        "title"     : String,
        "company"   : String,
        "location"  : String,
        "description" : [String]
    }],
    // --- List of education
    "educations" : [{
        "start"     : String,
        "end"       : String,
        "title"     : String,
        "school"    : String,
        "location"  : String,
        "description" : [String]
    }],
    // --- List of hobbies
    "hobbies" : [{
        "label" : String,
        "content" : [{
            "label" : String,
            "detail" : String
        }]
    }],
    // --- List of competencies
    "competencies" : [{
        "label" : String,
        "content" : [{
            "label" : String,
            "level" : String
        }]
    }],

    "extra" : String,


});

mongoose.model('Resume', ResumeSchema);