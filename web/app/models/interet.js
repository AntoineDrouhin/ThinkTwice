'use strict';

angular.module('thinktwiceApp')
    .factory('interet', function (thinktwiceApp, $filter, Model) {

        var interet = function interet(element) {
            Model.call(this, element, 'interet');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element.id;
                this.age = element.age;
                this.taille = element.taille;
                this.niveauEtudeid = element.niveauEtudeid;
                this.sexeid = element.sexeid;
                this.facetteid = element.facetteid;
                this.facetteid2 = element.facetteid2;
                this.facetteid3 = element.facetteid3;
                this.personneid = element.personneid;
            }

            // ------- Apply model extend
            interet.prototype = Object.create(Model.prototype);
            interet.prototype.constructor = interet;

            return interet;
        }

    });
