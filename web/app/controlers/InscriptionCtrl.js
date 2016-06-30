/**
 * Created by Kersa on 30/06/2016.
 */
'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('inscriptionCtrl', function($scope, $http, $mdDialog, $mdMedia){
        $scope.monjson = {
            ok : 'ok',
            okk : 'okk'
        };



        $scope.inscription = function(personne) {
            alert("entree ");
            if(personne.prenom == null
            || personne.nom == null
            || personne.mdp == null){
                alert("monene");
            }
        }



    });