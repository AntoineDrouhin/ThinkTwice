/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <geoffreyharrazi@gmail.com>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('inscriptionCtrl', function($scope, $http, $state, $mdDialog, $mdMedia, WEBAPP_CONFIG){
        
        $scope.mdpconf = "";

        $scope.inscription = function () {
        if ($scope.mdpconf == $scope.personne.mdp) {
            $http({
                method: 'POST',
                url: WEBAPP_CONFIG.api_route +'/personne',
                data : $scope.personne
            }).then(function successCallback(response){
                console.log($scope.personne.personneid);
                $http({
                    method: 'POST',
                    url: WEBAPP_CONFIG.api_route + '/interet',
                    data : {
                        age : "",
                        taille : "",
                        niveauEtude : "",
                        sexe : "",
                        facetteid1 : "A1",
                        facetteid2 : "A1",
                        facetteid3 : "A1",
                        origine1 : "",
                        origine2 : "",
                        origine3 : "",
                        personneid : response.data[0].id
                    }
                });
                swal("Success !!!", "L'equipe thinktwice vous souhaite la bienvenue", "success");
                $state.transitionTo('login');

            }, function errorCallback(response){
                console.log(response)
            });
        } else { swal("Mots de passes différents",'','error')}
        };
        
    });