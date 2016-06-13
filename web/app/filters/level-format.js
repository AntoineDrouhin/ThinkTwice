'use strict';

angular.module('myResumeApp')
    .filter('levelFormat', function() {
        return function (value) {
            if(isNaN(value)){
                return value;
            }else{
                var result = "";
                for(var i = 0; i <=value ; i++){
                    result += '\u2605';
                }
                return result;
            }
        };
    });