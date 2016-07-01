'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('matchCtrl', function($scope, $http, $mdDialog, $mdMedia, WEBAPP_CONFIG){

        var idUser = window.localStorage.getItem("thinktwice_userId");

        // Aller chercher les informations sur la personne
        $http({
            method: 'GET',
            url: WEBAPP_CONFIG.api_route + '/personne/' + idUser + '/ttmatch',
            data : $scope.interet
        }).then(function successCallback(response){
            //si on a un match
            
        }, function errorCallback(response){
            // si on a pas de match
        });

        $scope.personne = {
            dateDeNaissance : "",
            taille : 0,
            adresse : "",
            cp : "",
            ville: "",
            situationFamiliale : "",
            niveauEtude : 0,
            origine : "",
            Universite : "",
            loisir : "",
            metier : "",
            sexe : "",
            id_personne : 0
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