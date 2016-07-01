

'use strict';

angular.module('thinktwiceApp')
    .config(function($httpProvider){
        $httpProvider.interceptors.push(function($q,$injector){
            return {
                'request': function(config) {
                    var SecurityContext = window.localStorage.getItem('thinktwice_token');

                    if (SecurityContext) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = SecurityContext;
                    }
                    return config || $q.when(config);
                },
                'responseError': function(response) {

                    if (response.status == 401) {
                        swal('Vous avez été déconnecté','','error');
                        //TODO : décomenter la ligne suivante
                        //$injector.get('$state').transitionTo('login');
                    }
                    return $q.reject(response);
                }
            }
        })
    });


