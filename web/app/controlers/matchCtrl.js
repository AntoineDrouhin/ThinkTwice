'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('matchCtrl', function($scope, $http, $mdDialog, $mdMedia){

        $scope.personne = {
            prenom : 'Le KERSS',
            dateDeNaissance : '1996/05/29',
            situationFamiliale : 'Célibataire bien sûr...',
            sexe : 'f'
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