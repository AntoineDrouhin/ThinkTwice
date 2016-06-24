'use strict';

angular.module('thinktwiceApp')
    .directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/views/directives/navbar.html'
        }
    });