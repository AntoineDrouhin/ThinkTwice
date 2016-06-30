'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('matchCtrl', function($scope, Resumes, $http, $mdDialog, $mdMedia){


        io.sockets.on('connection', function (socket) {
            socket.emit('msg', { msg: msg });
            socket.on('msg', function(msg){
                msg[msg.msg-1].msg++;
                io.sockets.emit('msg', { msg: msg });
            })
        });



    });