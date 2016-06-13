'use strict';

angular.module('myResumeApp')
    .factory('Model', function (ConfigResumeApp, $http, $injector) {

        // ---------------------------------------------------------------------------------------------------------
        //                                                                                              CONSTRUCTOR
        // ---------------------------------------------------------------------------------------------------------
        /**
         * Init a default model
         * @constructor
         */
        var model = function model () {};

        model.prototype = Object.create(Object.prototype);
        model.prototype.constructor = model;

        /**
         * Build a clone of the current object
         * Useful for form and co
         * @returns {model|*}
         */
        model.prototype.clone = function(){
            return new this.constructor(this);
        };

        // ---------------------------------------------------------------------------------------------------------
        //                                                                                          GETTER / SETTER
        // ---------------------------------------------------------------------------------------------------------
        /**
         * Access to an attribute from the object
         * @param attribute
         * @returns {*}
         */
        model.prototype.get = function (attribute) {
            return this[attribute];
        };

        /**
         * Set attributes to the object
         * @param elements
         */
        model.prototype.set = function(elements){
            // ---- CHeck if the curent object use the schema methods
            if(this.useSchema === true){
                var schema = Object.keys(this.schema());

                angular.forEach(elements, function(value, key){
                    if(schema.indexOf(key) != -1){

                        var attribute = this.schema()[key];

                        switch(attribute.type){
                            // Manage case of object or collection about complex attribute
                            case  'Collection' :
                            case 'Object' :

                                var object = $injector.get(attribute.model),
                                    instance = new object(value);

                                this[key] = instance;

                                break;

                            default :
                                this[key] = value;
                                break;

                        }
                    }

                }, this);
            }else{
                angular.forEach(elements, function(value, key){
                    this[key] = value;
                }, this);
            }




        };
        /**
         * Return the current model name of the object.
         * Used about generic templetating
         * @returns {string}
         */
        model.prototype.getMetaName = function(){
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec((this).constructor.toString());
            return (results && results.length > 1) ? results[1] : "model";
        };

        model.prototype.getLabelObject = function(){
            return this.label_object || this.getMetaName();
        };

        /**
         * Return the object name
         * @returns {model.objectName|*|string}
         */
        model.prototype.objectName = function(){
            return this.objectName || "model"
        };
        /**
         * Default method to get an Id
         * @returns {string}
         */
        model.prototype.getId = function () {
            return this.id ? this.id : '';
        };

        model.prototype.setId = function(id){
            this.id = id;
        };
        /**
         * Return the name > make it mandatory for all object
         * @returns {*}
         */
        model.prototype.getName = function(){
            return this.name;
        };
        /**
         * Get difference between to object of the same instance
         * Only about editable attribute
         * @param object
         * @returns {*}
         */
        model.prototype.getDiff = function(object){
            if(object instanceof this.constructor){

                var schema      = this.schema(),
                    schemaKeys  = Object.keys(schema),
                    diff        = {};

                for(var i = 0, len = schemaKeys.length; i<len;i++){
                    // ---- We check only editable attribute
                    if(!schema[schemaKeys[i]].isObject() && !schema[schemaKeys[i]].isImg()){
                        if(this.get(schemaKeys[i]) != object.get(schemaKeys[i])){
                            diff[schemaKeys[i]] = object.get(schemaKeys[i]);
                        }
                    }
                }
                return diff;

            }else{
                return false;
            }
        };

        /**
         * Find the attribute image of an object
         * @returns {boolean}
         */
        model.prototype.haveImg = function(){
            var schema      = this.schema(),
                schemaKeys  = Object.keys(schema),
                havePicture = false,
                i           = 0;

            while(i < schemaKeys.length && !havePicture){
                if(schema[schemaKeys[i]].isImg()){
                    havePicture = schemaKeys[i];
                }
                i++;
            }

            return havePicture;
        };
        // ---------------------------------------------------------------------------------------------------------
        //                                                                                               API METHOD
        // ---------------------------------------------------------------------------------------------------------
        /**
         * Build the URI to access object information from API
         * @param extension
         * @returns {string}
         */
        model.prototype.getAccessUri = function (extension) {
            return this.uri + '/' + this.getId() +
                ( extension ? (extension.indexOf('/') != 0 ? '/' : '' + extension) : '');
        };
        /**
         * Load information from the the API about the current object
         * @returns {*}
         */
        model.prototype.fetch = function () {
            var self = this;

            return $http.get(self.getAccessUri()).then(function (httpResponse) {
                self.constructor(httpResponse.data);
            });
        };
        /**
         * Update information about a model
         * @param params
         * @returns {*}
         */
        model.prototype.update = function(params){
            var self = this;
            return $http.put(self.getAccessUri(),params).then(function(httpResponse){
                self.set(params);
                self.postUpdate();
            })
        };
        /**
         * Do something after the creation
          */
        model.prototype.postUpdate = function(){
            // ---- Do something after creation
        };
        /**
         * Delete an object from the API
         * @returns {*}
         */
        model.prototype.delete = function(){
            return $http.delete(this.getAccessUri());
        };
        /**
         * Create an object
         * @returns {*}
         */
        model.prototype.create = function(){
            var self        = this;

            if(this.useSchema === true){

                var schema      = this.schemaForm(),
                    keys        = Object.keys(schema),
                    attributes  = {};

                // ---- Extract value
                for(var i = 0,len = keys.length;i<len;i++){

                    if(schema[keys[i]].toApi){
                        if(!schema[keys[i]].isObject() && !schema[keys[i]].isImg()){
                            attributes[keys[i]] = this[keys[i]];
                        }else if(schema[keys[i]].isObject()){
                            attributes[keys[i]] = this[keys[i]].toApi();
                        }
                    }

                }

                return $http.post(this.uri, attributes).then(function(response){
                    self.set(attributes);
                    self.setId(response.data.id);
                    self.postCreate(response.data);
                })

            }else{

                return $http.post(this.getAccessUri(), this).then(function(response){
                    self.set({id : response.data.id});
                })
            }

        };
        /**
         * Do something after the creation
         */
        model.prototype.postCreate = function(data){
            // ---- Do something after creation
        };

        /**
         * Get default link of an icon from the API
         * @returns {string}
         */
        model.prototype.getIconUri = function(){
            return this.getAccessUri('/icon');
        };

        /**
         * Transform an object to a json for api
         * @returns {*}
         */
        model.prototype.toApi = function(){
            if(this.useSchema === true){

                var schema      = this.schema(),
                    keys        = Object.keys(schema),
                    attributes  = {};

                // ---- Extract value
                for(var i = 0,len = keys.length;i<len;i++){
                    if(schema[keys[i]].toApi){
                        if(!schema[keys[i]].isObject() && !schema[keys[i]].isImg()){
                            attributes[keys[i]] = this[keys[i]];
                        }else if(schema[keys[i]].isObject()){
                            attributes[keys[i]] = this[keys[i]].toApi();
                        }
                    }

                }

                return attributes;

            }else{
                return this;
            }
        };

        // ---------------------------------------------------------------------------------------------------------
        //                                                                                                  RETURN
        // ---------------------------------------------------------------------------------------------------------
        return model;
    });