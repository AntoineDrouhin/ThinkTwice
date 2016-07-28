/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <geoffreyharrazi@gmail.com>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


'use strict';

angular.module('thinktwiceApp')
    .factory('origine_interet', function (thinktwiceApp, $filter, Model) {

        var origine_interet = function origine_interet(element) {
            Model.call(this, element, 'origine_interet');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.origineid = element.origineid;
                this.interetid = element.interetid;
            }

            // ------- Apply model extend
            origine_interet.prototype = Object.create(Model.prototype);
            origine_interet.prototype.constructor = origine_interet;

            return origine_interet;
        }

    });
