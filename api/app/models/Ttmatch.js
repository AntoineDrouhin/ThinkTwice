/**
 * Created by geoff on 25/06/2016.
 */
//------ Model USER
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;


var TtmatchSchema = new Schema({
    id       : int,
    date_deb  : Date,
    personneid     : { type : Schema.Types.ObjectId, ref: 'personne' },
    personneid2     : { type : Schema.Types.ObjectId, ref: 'personne' }
});

mongoose.model('ttmatch', TtmatchSchema);