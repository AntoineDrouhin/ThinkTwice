/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <geoffreyharrazi@gmail.com>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


'use strict';

angular.module('thinktwiceApp')
    .factory('personne', function (thinktwiceApp, $filter, Model) {

        var personne = function personne(element) {
            Model.call(this, element, 'personne');
            this.uri = thinktwiceApp.getUri('uri_thinktwice');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element.id;
                this.prenom = element.prenom;
                this.nom = element.nom;
                this.dateDeNaissance = element.dateDeNaissance;
                this.taille = element.taille;
                this.adresse = element.adresse;
                this.cp = element.cp;
                this.ville = element.ville;
                this.login = element.login;
                this.mdp = element.mdp;
                this.situationFamilialeid = element.situationFamilialeid;
                this.niveauEtudeid = element.niveauEtudeid;
                this.origineid = element.origineid;
                this.universiteid = element.universiteid;
                this.loisirid = element.loisirid;
                this.metierid = element.metierid;
                this.sexeid = element.sexeid;
            }

            // ------- Apply model extend
            personne.prototype = Object.create(Model.prototype);
            personne.prototype.constructor = personne;

            return personne;
        }

    });
