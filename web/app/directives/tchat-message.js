'use strict';

angular.module('thinktwiceApp')
    .directive('tchat-message', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/views/directives/tchat-message.html'
        }
    });