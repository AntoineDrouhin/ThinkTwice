'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('loginCtrl', function($scope, $http, $mdDialog, $mdMedia){

        $scope.personne = {
            "login" : "",
            "mdp" : ""
        }

    });