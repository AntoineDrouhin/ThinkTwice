'use strict';

angular.module('thinktwiceApp')
    .factory('facette', function (thinktwiceApp, $filter, Model) {

        var facette = function facette(element) {
            Model.call(this, element, 'facette');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element.id;
                this.libelle = element.libelle;
            }

            // ------- Apply model extend
            facette.prototype = Object.create(Model.prototype);
            facette.prototype.constructor = facette;

            return facette;
        }

    });