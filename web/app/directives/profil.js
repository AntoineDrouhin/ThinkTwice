'use strict';

angular.module('thinktwiceApp')
    .directive('profile', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/views/directives/profile.html'
        }
    });