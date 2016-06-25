/**
 * Created by geoff on 25/06/2016.
 */
//------ Model USER
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;


var Origine_interetSchema = new Schema({
    origineid       : int,
    interetif  : int
});

mongoose.model('origine_interet', Origine_interetSchema);