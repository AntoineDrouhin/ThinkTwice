'use strict';

angular.module('myResumeApp')
    .directive('hobcomp', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/views/directives/hobcomp.html'
    }
});