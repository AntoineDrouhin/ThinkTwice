
'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('inscriptionCtrl', function($scope, $http, $mdDialog, $mdMedia){

        $scope.personne = {
            "nom" :"",
            "prenom" :"",
            "login" :"",
            "mdp" :"",
            "mail" : ""
        };


        $scope.inscription = function () {
            $http({
                method: 'POST',
                url: 'http://0.0.0.0:3000/personne',
                headers: {
                    'Content-Type': undefined
                },
                data : $scope.personne
            }).then(function successCallback(response){

            }, function errorCallback(response){
                console.log(response)
            });
        };

        /*
        $scope.inscription = function(submit) {

            $scope.personne = angular.copy(submit);

            if($scope.personne.hasOwnProperty("login")
                && $scope.personne.hasOwnProperty("mdp")
                && $scope.personne.hasOwnProperty("mdpconf")
            ){
                if($scope.personne.mdp == $scope.personne.mdpconf){

                }
            }
        }
*/
    });