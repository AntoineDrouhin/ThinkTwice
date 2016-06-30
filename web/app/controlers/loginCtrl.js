'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('loginCtrl', function($scope, $http, $mdDialog, $mdMedia){

        $scope.personne = {
            "login" : "",
            "mdp" : ""
        };
        
        $scope.login = function () {

            $http({
                method: 'POST',
                url: 'http://0.0.0.0:3000/login',
                data: $scope.personne
            }).then(function successCallback(response){

                window.localStorage.setItem("thinktwice_userId", response.id);
                window.localStorage.setItem("thinktwice_token", response.token);

                document.location.href = "#/match";

            }, function errorCallback(response){
                swal("Oops...", "Combinaison / Mot de passe incorrecte", "error");
            });

        };

    });