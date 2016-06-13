'use strict';

angular.module('myResumeApp')
    .directive('message-box', function(){
        return {
            restrict : 'E',
            templateUrl : 'app/views/directives/message-box.html',
            scope : {
                coordonnee : '='
            },
            link : function(scope){

            }
        }
    });
