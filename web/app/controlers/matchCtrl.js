'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('matchCtrl', function($scope, $state, $http, $mdDialog, $mdMedia, WEBAPP_CONFIG){

        var idUser = window.localStorage.getItem("thinktwice_userId");

        // Aller chercher les informations sur la personne
        $http({
            method: 'GET',
            url: WEBAPP_CONFIG.api_route + '/personne/' + idUser + '/ttmatch'
        }).then(function successCallback(response){
            $http({
                method: 'GET',
                url: WEBAPP_CONFIG.api_route + '/personne/' + response.data.matchPersonId
            }).then(function successCallback(response){
                $scope.personne = response.data[0];
            }, function errorCallback(response){

            });
            $http({
                method: 'GET',
                url: WEBAPP_CONFIG.api_route + '/avatar/from/' + response.data.matchPersonId
            }).then(function successCallback(response){
                $scope.linkSrcImage = response.data.link;
            }, function errorCallback(response){
                $scope.linkSrcImage = '/images/placeholder.jpg';
            });

            $("#tchat-frame").attr("src", "http://localhost:9000?token=" + response.data.id + "&user=" + idUser);
        }, function errorCallback(response){
            console.log(response);
        });

        $scope.zapper = function () {
            $http({
                method: 'DELETE',
                url: WEBAPP_CONFIG.api_route + '/ttmatch/' + idUser
            }).then(function successCallback(response){
                $state.transitionTo('match');
            }, function errorCallback(response){

            });
        };

    });