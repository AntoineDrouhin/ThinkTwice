'use strict';
var current_resume;
angular.module('myResumeApp')
    .controller('myResumeCtrl', function($scope, Resumes, $http, $mdDialog, $mdMedia){

        /**
         * Load all CV from the database
         */
        $scope.resumes = new Resumes();
        $scope.resumes.fetch().then(function(){
            console.log($scope.resumes);
        },function(reason){
            console.log(reason);
        });

        $scope.displayResume = function(resume){
            var person = angular.copy(resume.person);
            resume.fetch().then(function(){
                $scope.current_resume = resume;
                $scope.current_resume.person = person;
                current_resume = $scope.current_resume

            })
        };

        $scope.hide = function(){
            angular.element('#sidenav').hide();
            angular.element('#show').show();
            angular.element('#hide').hide();
        };
        $scope.display = function(){
            angular.element('#sidenav').show();
            angular.element('#hide').show();
            angular.element('#show').hide();
        }



        $scope.showAdvanced = function(id) {
            var useFullScreen = true;

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


        };

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

            $scope.sendMessage = function() {
                $http({
                    method: 'GET',
                    url: 'http://0.0.0.0:3000/message/' + current_resume.id + "/" + $scope.contactname + "/" + $scope.textmessage
                }).then(function successCallback(response) {
                }, function errorCallback(response) {
                    // nothing
                });
            }
        }
    });