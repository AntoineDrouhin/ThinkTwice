'use strict';

angular.module('thinktwiceApp')
    .directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/views/directives/navbar.html',
            link: function (scope) {
                scope.deconnection = function () {
                    window.localStorage.removeItem('thinktwice_token');
                    state.transitionTo('login');
                };
                scope.goProfil = function () {
                    state.transitionTo('profil');
                };
                scope.goMatch= function () {
                    state.transitionTo('match');
                };
            }
        }
    });