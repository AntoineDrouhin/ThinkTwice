'use strict';

angular.module('thinktwiceApp')
    .directive('navbar', 'deconnection', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/views/directives/navbar.html'
        }
        

    });