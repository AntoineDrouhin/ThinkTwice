'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('matchCtrl', function($scope, $http, $mdDialog, $mdMedia, WEBAPP_CONFIG){

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
        }, function errorCallback(response){
            console.log(response);
        });

        // io.sockets.on('connection', function (socket) {
        //     socket.emit('msg', { msg: msg });
        //     socket.on('msg', function(msg){
        //         msg[msg.msg-1].msg++;
        //         io.sockets.emit('msg', { msg: msg });
        //     })
        // });

        $scope.getAge = function(date) {
            return 2;
        }

    });