
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
                swal("Success !!!", "L'equipe thinktwice vous souhaite la bienvenue", "success");
                document.location.href = "#/profil";
                $state.transitionTo('profil');

            }, function errorCallback(response){
                console.log(response)
            });
        } else { swal("Mots de passes différents",'','error')}
        };
        
    });