'use strict';

angular.module('myResumeApp')
    .directive('message-list', function(){
        return {
            restrict : 'E',
            templateUrl : 'app/views/directives/old-msglst.html',
            scope : {
                coordonnee : '='
            },
            link : function(scope){

            }
        }
    });
