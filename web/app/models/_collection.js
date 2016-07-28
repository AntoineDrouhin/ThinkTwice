/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <geoffreyharrazi@gmail.com>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


'use strict';

/**
 * DEFAULT MEDIBASE COLLECTION
 */
angular.module('myResumeApp')
    .factory('Collection', function($http, Model,$q){

        var collection = function collection(model){

            Model.call(this);

            this.items      = [];
            this.ids        = [];
            this.model      = model;
        };

        collection.prototype = Object.create(Model.prototype);
        collection.prototype.constructor = collection;

        // -------- ADD AN ITEM {treatment to transform in object}
        collection.prototype.addItem = function(item){
            if(this.ids.indexOf(item) == -1){
                // ----- Create object if needed
                if(!(item instanceof this.model)){
                    item = new this.model(item);
                }
                // ----- Add table
                this.ids.push(item.getId());
                this.items.push(item);
            } else {
                // --- If found, we just update the element
                this.items[this.ids.indexOf(item)] = item;
            }
        };
        // -------- ADD AN ARRAY OF ITEMS
        collection.prototype.addItems = function(items){
            // ---- Case of Array
            if(Array.isArray(items)){
                for(var i = 0, len = items.length;i<len;i++){
                    this.addItem(items[i]);
                }
            }
            return this.items;
        };
        // -------- REMOVE AN ITEM BY ID FROM A THE LIST
        collection.prototype.removeById = function(id) {
            var index = this.ids.indexOf(id);
            if(index != -1) {
                this.ids.splice(index, 1);
                this.items.splice(index, 1);
            }
        };
        // -------- FIND BY ID A ITEM IN THE LIST
        collection.prototype.retrieveById = function(id) {
            var index = this.ids.indexOf(id);
            if(index != -1) {
                return this.items[index];
            } else {
                // ---- return a empty object;
                return new this.model();
            }
        };
        // -------- INIT THE COLLECTION
        collection.prototype.init = function () {
            this.items = [];
            this.ids   = [];
        };
        // -------- Check if the items list is empty or not
        collection.prototype.isEmpty = function () {
            return this.toArray().length == 0;
        };
        // -------- Return the list of items with a array format for ng-repeat stuff
        collection.prototype.toArray = function () {
            return this.items;
        };
        // -------- Return a json list with ids
        collection.prototype.toJsonIds = function () {
            var ids = [];
            angular.forEach(this.ids, function (value) {
                ids.push({ id: value })
            });
            return ids;
        };

        /**
         * Fill collection elements
         * @returns collection
         */
        collection.prototype.fetch = function (params) {

            var self = this;

            return $http.get(self.get('uri'), { params: params }).then(function (httpResponse) {
                self.constructor(httpResponse.data);
            });

        };

        /**
         * Function to order a list of item
         */
        collection.prototype.order = function(value){

            value = value || 'name';

            this.items.sort(function (a, b) {
                if (a.get(value).toLowerCase() > b.get(value).toLowerCase()) {
                    return 1;
                }
                if (a.get(value.toLowerCase()) < b.get(value).toLowerCase()) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
        };

        /**
         * Prepare items to send to API items from the local storage
         * @returns {*}
         */
        collection.prototype.toApi = function(){
            var toApi = [];

            for(var i = 0, len = this.items.length; i < len; i++){
                toApi.push(this.items[i].toApi());
            }

            return toApi;
        };


        // ------------------------------------------------ RETURN
        return collection;
    });