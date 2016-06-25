/**
 * Created by geoff on 25/06/2016.
 */
//------ Model USER
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;


var QuestionSchema = new Schema({
    id       : int,
    libelle     : String,
    typeBaremeid     : { type : Schema.Types.ObjectId, ref: 'typeBareme' },
    facetteid     : { type : Schema.Types.ObjectId, ref: 'facette' }
});

mongoose.model('question', QuestionSchema);