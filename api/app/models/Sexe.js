/**
 * Created by geoff on 25/06/2016.
 */
//------ Model USER
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;


var SexeSchema = new Schema({
    id       : int,
    code     : String,
    libelle  : String
});

mongoose.model('sexe', SexeSchema);