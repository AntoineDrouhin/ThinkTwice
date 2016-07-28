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
    .factory('personnalite', function (thinktwiceApp, $filter, Model) {

        var personnalite = function personnalite(element) {
            Model.call(this, element, 'personnalite');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element.id;
                this.libelle = element.libelle;
            }

            // ------- Apply model extend
            personnalite.prototype = Object.create(Model.prototype);
            personnalite.prototype.constructor = personnalite;

            return personnalite;
        }

    });
