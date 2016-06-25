'use strict';

angular.module('thinktwiceApp')
    .factory('personne_personnalite', function (thinktwiceApp, $filter, Model) {

        var personne_personnalite = function personne_personnalite(element) {
            Model.call(this, element, 'personne_personnalite');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.score = element.score;
                this.personnaliteid = element.personnaliteid;
                this.personneid = element.personneid;
            }

            // ------- Apply model extend
            personne_personnalite.prototype = Object.create(Model.prototype);
            personne_personnalite.prototype.constructor = personne_personnalite;

            return personne_personnalite;
        }

    });
