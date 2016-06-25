/**
 * Created by geoff on 25/06/2016.
 */
//------ Model USER
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;


var PersonneSchema = new Schema({
    id       : int,
    prenom     : String,
    nom  : String,
    dateDeNaissance  : Date,
    taille  : int,
    adresse  : String,
    cp  : int,
    ville  : String,
    login  : String,
    mdp  : String,
    situationFamilialeid     : { type : Schema.Types.ObjectId, ref: 'situationFamiliale' },
    niveauEtudeid     : { type : Schema.Types.ObjectId, ref: 'niveauEtude' },
    origineid     : { type : Schema.Types.ObjectId, ref: 'origine' },
    universiteid     : { type : Schema.Types.ObjectId, ref: 'universite' },
    loisirid     : { type : Schema.Types.ObjectId, ref: 'loisir' },
    metierid     : { type : Schema.Types.ObjectId, ref: 'metier' },
    sexeid     : { type : Schema.Types.ObjectId, ref: 'sexe' }
});

mongoose.model('personne', PersonneSchema);