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
    .factory('origine', function (thinktwiceApp, $filter, Model) {

        var origine = function origine(element) {
            Model.call(this, element, 'origine');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element.id;
                this.libelle = element.libelle;
            }

            // ------- Apply model extend
            origine.prototype = Object.create(Model.prototype);
            origine.prototype.constructor = origine;

            return origine;
        }

    });
