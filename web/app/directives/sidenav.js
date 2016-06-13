'use strict';

angular.module('myResumeApp')
    .directive('sidenav', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/views/directives/sidenav.html'
        }
    });