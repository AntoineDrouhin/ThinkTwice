/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <geoffreyharrazi@gmail.com>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


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
                        $injector.get('$state').transitionTo('login');
                    }
                    return $q.reject(response);
                }
            }
        })
    });


