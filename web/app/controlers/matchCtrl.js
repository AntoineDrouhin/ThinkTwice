'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('matchCtrl', function($scope, $http, $mdDialog, $mdMedia){

        $scope.personne = {
            prenom : "",
            dateDeNaissance : "",
            situationFamiliale : "",
            sexe : 'm',
            age : 8
        };


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