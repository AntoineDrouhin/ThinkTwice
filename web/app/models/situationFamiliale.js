'use strict';

angular.module('thinktwiceApp')
    .factory('situationFamiliale', function (thinktwiceApp, $filter, Model) {

        var situationFamiliale = function situationFamiliale(element) {
            Model.call(this, element, 'situationFamiliale');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element.id;
                this.libelle = element.libelle;
            }

            // ------- Apply model extend
            situationFamiliale.prototype = Object.create(Model.prototype);
            situationFamiliale.prototype.constructor = situationFamiliale;

            return situationFamiliale;
        }

    });
