'use strict';

angular.module('thinktwiceApp')
    .directive('login', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/views/directives/login.html'
        }
    });