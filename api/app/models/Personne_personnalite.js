/**
 * Created by geoff on 25/06/2016.
 */
//------ Model USER
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;


var Personne_personnaliteSchema = new Schema({
    score       : int,
    personnaliteid     : { type : Schema.Types.ObjectId, ref: 'personnalite' },
    personneid     : { type : Schema.Types.ObjectId, ref: 'personne' }
});

mongoose.model('personne_personnalite', Personne_personnaliteSchema);