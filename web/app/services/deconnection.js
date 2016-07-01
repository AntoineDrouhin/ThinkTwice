
'use strict';

angular.module('thinktwiceApp')
    .service('uploadImage', function($timeout, $http){
        
        window.localStorage.removeItem('thinktwice_token');
        document.location.href = '#/login';

    });

