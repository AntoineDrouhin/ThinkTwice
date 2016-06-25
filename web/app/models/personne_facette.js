'use strict';

angular.module('thinktwiceApp')
    .factory('personne_facette', function (thinktwiceApp, $filter, Model) {

        var personne_facette = function personne_facette(element) {
            Model.call(this, element, 'personne_facette');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.score = element.score;
                this.facetteid = element.facetteid;
                this.personneid = element.personneid;
            }

            // ------- Apply model extend
            personne_facette.prototype = Object.create(Model.prototype);
            personne_facette.prototype.constructor = personne_facette;

            return personne_facette;
        }

    });
