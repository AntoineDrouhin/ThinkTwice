'use strict';

angular.module('thinktwiceApp')
    .directive('tchatmsg', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/views/directives/tchatmsg.html'
        }
    }); 