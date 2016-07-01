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

                $state.transitionTo('profil');

            }, function errorCallback(response){
                swal("Oops...", "Combinaison / Mot de passe incorrecte", "error");
            });

        };

        $scope.inscription = function () {
            document.location.href = "#/inscription";
        }

    });