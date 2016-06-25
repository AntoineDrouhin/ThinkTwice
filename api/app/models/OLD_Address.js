//------ Model USER
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Person Schema
var AddressSchema = new Schema({
    street  : String,
    zipCode : String,
    city    : String
});

mongoose.model('Address', AddressSchema);