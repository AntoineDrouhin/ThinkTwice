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
    .controller('loginCtrl', function($scope, $state, $http, $mdDialog, $mdMedia, WEBAPP_CONFIG){

        $scope.personne = {
            "login" : "",
            "mdp" : ""
        };
        
        $scope.login = function () {

            $http({
                method: 'POST',
                url: WEBAPP_CONFIG.api_route + '/login',
                data: $scope.personne
            }).then(function successCallback(response){

                window.localStorage.setItem("thinktwice_userId", response.data.id);
                window.localStorage.setItem("thinktwice_token", response.data.token);

                $state.transitionTo('match');

            }, function errorCallback(response){
                swal("Oops...", "Combinaison / Mot de passe incorrecte", "error");
            });

        };

        $scope.inscription = function () {
            $state.transitionTo('inscription');
        }

    });