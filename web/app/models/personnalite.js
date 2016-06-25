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
