/**
 * Created by Kersa on 30/06/2016.
 */
'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('inscriptionCtrl', function($scope, $http, $mdDialog, $mdMedia){

        $scope.personne = {
        };

        $scope.inscription = function(submit) {
            alert("entree ");

            $scope.personne = angular.copy(submit);

            if($scope.personne.hasOwnProperty("login")
                && $scope.personne.hasOwnProperty("mdp")
                && $scope.personne.hasOwnProperty("mdpconf")
            ){
                if($scope.personne.mdp == $scope.personne.mdpconf){
                    
                    
                }
                
            }
        }



    });