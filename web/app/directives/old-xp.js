'use strict';

angular.module('myResumeApp')
    .directive('xp', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/views/directives/old-xp.html'
        }
    });