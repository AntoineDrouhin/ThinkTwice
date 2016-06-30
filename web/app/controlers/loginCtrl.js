'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('loginCtrl', function($scope, $http, $mdDialog, $mdMedia){




        $scope.showAdvanced = function(id) {

            // TODO: Faire un http post pour vérifier le login, (utiliser une fonction de hash avant ...)

/*
            $http({
                method: 'POST',
                url: 'http://example.com',
                headers: {
                    'Content-Type': undefined
                },
                data: { test: 'test' }
            }).then(function(){}, function(){});
*/

        };

    });