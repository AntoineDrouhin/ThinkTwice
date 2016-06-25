'use strict';

angular.module('thinktwiceApp')
    .factory('loisir', function (thinktwiceApp, $filter, Model) {

        var loisir = function loisir(element) {
            Model.call(this, element, 'loisir');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element.id;
                this.id = element.libelle;
            }

            // ------- Apply model extend
            loisir.prototype = Object.create(Model.prototype);
            loisir.prototype.constructor = loisir;

            return loisir;
        }

    });
