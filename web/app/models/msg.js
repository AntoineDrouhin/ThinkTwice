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
    .factory('msg', function (thinktwiceApp, $filter, Model) {

        var msg = function msg(element) {
            Model.call(this, element, 'msg');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element.id;
                this.txt = element.txt;
                this.date_post = element.date_post;
                this.ttmatchid = element.ttmatchid;
            }

            // ------- Apply model extend
            msg.prototype = Object.create(Model.prototype);
            msg.prototype.constructor = msg;

            return msg;
        }

    });
