'use strict';

angular.module('myResumeApp')
    .filter('textLimit', function() {

        return function (value, len) {
            if(value.length > len){
                return value.substring(0, len-3)+'...'
            }else{
                return value;
            }
        };

    });