/**
 * Created by geoff on 25/06/2016.
 */
//------ Model USER
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;


var OrigineSchema = new Schema({
    id       : int,
    libelle  : String
});

mongoose.model('origine', OrigineEtudeSchema);
