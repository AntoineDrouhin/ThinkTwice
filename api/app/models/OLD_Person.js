//------ Model USER
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Person Schema
var PersonSchema = new Schema({

    name        : String,

    birthDate   : String,

    contact : {
        address     : { type : Schema.Types.ObjectId, ref: 'Address' },
        telephone   : String,
        email       : String
    },

    photo : String
});

mongoose.model('Person', PersonSchema);