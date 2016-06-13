/**
 * Created by Geoffrey on 27/05/2016.
 */
//------ Model CONTACT
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema,
    async       = require('async'),
    moment      = require('moment');

//------------------------------------------- Contact Schema
var MessageSchema = new Schema({

    "nom" : String,
    "date": String,
    "textMessage" : String,
    "resume": { type : Schema.Types.ObjectId, ref: 'Resume' }

});

mongoose.model('Message', MessageSchema);