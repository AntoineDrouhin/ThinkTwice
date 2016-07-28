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
 * SERVICE config
 * Allow to access to the constant application
 */
angular.module('thinktwiceApp')
    .service('thinktwiceApp', function(WEBAPP_CONFIG) {

        /**
         * Main variable
         * Use an extend to adexd to possibility to add some testing key
         * @type {void|Object|*}
         */
        var parameters = angular.extend({}, WEBAPP_CONFIG);

        return {
            get : function(name){
                return parameters[name];
            },
            getUri : function(name){
                return this.get('api_route') + this.get(name);
            },
            /**
             * Get the link to the default user icon ...
             * @returns {string}
             */
            getDefaultAvatar : function(){
                return 'images/candidate/download.png';
            }
        };
    });