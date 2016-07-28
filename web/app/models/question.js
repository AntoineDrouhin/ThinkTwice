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
    .factory('question', function (thinktwiceApp, $filter, Model) {

        var question = function question(element) {
            Model.call(this, element, 'question');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element.id;
                this.libelle = element.libelle;
                this.typeBaremeid = element.typeBaremeid;
                this.facetteid = element.facetteid;
            }

            // ------- Apply model extend
            question.prototype = Object.create(Model.prototype);
            question.prototype.constructor = question;

            return question;
        }

    });
