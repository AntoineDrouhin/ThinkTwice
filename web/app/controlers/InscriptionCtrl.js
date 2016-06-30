
'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('inscriptionCtrl', function($scope, $http, $mdDialog, $mdMedia){

        $scope.personne = {
            "nom" : "",
            "prenom" : "",
            "login" : "",
            "mdp" : "",
            "mail" : ""
        };
        
        $scope.mdpconf = "";


        $scope.inscription = function () {
        if ($scope.mdpconf == $scope.personne.mdp) {
            $http({
                method: 'POST',
                url: 'http://0.0.0.0:3000/personne',
                data : $scope.personne
            }).then(function successCallback(response){

            }, function errorCallback(response){
                console.log(response)
            });
        } else { alert("Mots de passes différents")}
        };
        
    });