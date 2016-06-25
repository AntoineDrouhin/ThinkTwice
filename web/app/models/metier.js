'use strict';

angular.module('thinktwiceApp')
    .factory('metier', function (thinktwiceApp, $filter, Model) {

        var metier = function metier(element) {
            Model.call(this, element, 'metier');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element.id;
                this.libelle = element.libelle;
            }

            // ------- Apply model extend
            metier.prototype = Object.create(Model.prototype);
            metier.prototype.constructor = metier;

            return metier;
        }

    });

