'use strict';

angular.module('myResumeApp')
    .directive('resume', function (ConfigResumeApp) {
        return{
            restrict : 'E',
            templateUrl : 'app/views/directives/resume.html',
            scope : {
                resume : '=cv'
            },
            link : function(scope){

                /**
                 * Check if new resume arrive
                 */
                scope.$watch('resume', function(resume){
                    if(resume){
                        console.log(resume);
                        // ---- Active to display the current resume
                        scope.toDisplay = true;
                        scope.person    = resume.person;
                        console.log(scope.person);
                    }
                });

                scope.defaultAvatar = ConfigResumeApp.getDefaultAvatar();

                scope.orderFn = function(element){
                    return moment(new Date(element.start)).valueOf();
                };
            }
        }
    });