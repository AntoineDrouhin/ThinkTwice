/**
 * Created by geoff on 25/06/2016.
 */
//------ Model USER
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;


var MsgSchema = new Schema({
    id       : int,
    txt  : String,
    date_post : Date,
    ttmatchid     : { type : Schema.Types.ObjectId, ref: 'ttmatch' }
});

mongoose.model('msg', MsgSchema);