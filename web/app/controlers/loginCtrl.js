'use strict';
var current_resume;
angular.module('loginApp')
    .controller('loginCtrl', function($scope, Resumes, $http, $mdDialog, $mdMedia){




        $scope.showAdvanced = function(id) {
            var useFullScreen = true;

            // TODO: Faire un http post pour vérifier le login, (utiliser une fonction de hash avant ...)


            $http({
                method: 'POST',
                url: 'http://example.com',
                headers: {
                    'Content-Type': undefined
                },
                data: { test: 'test' }
            }).then(function(){}, function(){});

            /* OLD EXAMPLE
            $http({
                method: 'GET',
                url: 'http://0.0.0.0:3000/message/' + id
            }).then(function successCallback(response) {
                $scope.current_messages = response.data;
                $mdDialog.show({
                    controller : DialogController,
                    templateUrl: '/app/views/directives/old-message.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:true,
                    fullscreen: useFullScreen
                })
                    .then(function(answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });
                $scope.$watch(function() {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function(wantsFullScreen) {
                    $scope.customFullscreen = (wantsFullScreen === true);
                });
            }, function errorCallback(response) {
                // nothing
            });
            */


        };

        /*
        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
        */
    });