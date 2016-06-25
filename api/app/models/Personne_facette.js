/**
 * Created by geoff on 25/06/2016.
 */
//------ Model USER
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;


var Personne_facetteliteSchema = new Schema({
    score       : int,
    facetteid     : { type : Schema.Types.ObjectId, ref: 'facette' },
    personneid     : { type : Schema.Types.ObjectId, ref: 'personne' }
});

mongoose.model('personne_facette', Personne_facetteliteSchema);