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
