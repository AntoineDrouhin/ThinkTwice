/**
 * Created by Antoine on 24/06/2016.
 */
'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('profileCtrl', function($scope, profil, $http, $mdDialog, $mdMedia){

        // TODO : Retrieve questions
        $http({
            method: 'GET',
            url: 'http://0.0.0.0:3000/question/'
        }).then(function successCallback(response) {
            $scope.profil_question = response;
        }, function errorCallback(response) {
            $scope.profil_question = {error: true}
            alert("error Récupération questions");
        });



    });