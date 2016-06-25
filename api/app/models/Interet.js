/**
 * Created by geoff on 25/06/2016.
 */
//------ Model USER
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;


var InteretSchema = new Schema({
    id       : int,
    age     : int,
    taille  : int,
    niveauEtudeid     : { type : Schema.Types.ObjectId, ref: 'niveauEtude' },
    sexeid     : { type : Schema.Types.ObjectId, ref: 'sexe' },
    facetteid     : { type : Schema.Types.ObjectId, ref: 'facette' },
    facetteid2     : { type : Schema.Types.ObjectId, ref: 'facette' },
    facetteid3     : { type : Schema.Types.ObjectId, ref: 'facette' },
    personneid     : { type : Schema.Types.ObjectId, ref: 'personne' }
});

mongoose.model('interet', InteretSchema);