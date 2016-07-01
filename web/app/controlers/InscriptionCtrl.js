
'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('inscriptionCtrl', function($scope, $http, $mdDialog, $mdMedia, WEBAPP_CONFIG){

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
                url: WEBAPP_CONFIG.api_route +'/personne',
                data : $scope.personne
            }).then(function successCallback(response){
                swal("Success !!!", "L'equipe thinktwice vous souhaite la bienvenue", "success");
                document.location.href = "#/profil";

            }, function errorCallback(response){
                console.log(response)
            });
        } else { alert("Mots de passes différents")}
        };
        
    });