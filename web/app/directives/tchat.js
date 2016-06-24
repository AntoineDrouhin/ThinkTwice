'use strict';

angular.module('thinktwiceApp')
    .directive('tchat', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/views/directives/tchat.html'
        }
    });