'use strict';

angular.module('thinktwiceApp')
    .factory('sexe', function (thinktwiceApp, $filter, Model) {

        var sexe = function sexe(element) {
            Model.call(this, element, 'sexe');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element.id;
                this.libelle = element.libelle;
                this.code = element.code;
            }

            // ------- Apply model extend
            sexe.prototype = Object.create(Model.prototype);
            sexe.prototype.constructor = sexe;

            return sexe;
        }

    });