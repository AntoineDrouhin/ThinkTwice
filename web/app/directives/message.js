'use strict';

angular.module('myResumeApp')
    .directive('message', function(){
        return {
            restrict : 'E',
            templateUrl : 'app/views/directives/message.html'
        }
    });
