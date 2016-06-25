'use strict';

angular.module('thinktwiceApp')
    .factory('niveauEtude', function (thinktwiceApp, $filter, Model) {

        var niveauEtude = function niveauEtude(element) {
            Model.call(this, element, 'niveauEtude');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element.id;
                this.libelle = element.libelle;
            }

            // ------- Apply model extend
            niveauEtude.prototype = Object.create(Model.prototype);
            niveauEtude.prototype.constructor = niveauEtude;

            return niveauEtude;
        }

    });
