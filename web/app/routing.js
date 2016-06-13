'use strict';

angular.module('myResumeApp')
    .config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('home', {
                url         : '/',
                templateUrl : 'app/views/layout.html',
                controller  : 'myResumeCtrl'
            });

        $urlRouterProvider.otherwise('/');
    });