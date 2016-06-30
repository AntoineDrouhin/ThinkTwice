'use strict';

angular.module('thinktwiceApp')
    .config(function ($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url         : '/login',
                templateUrl : 'app/views/login.html',
                controller  : 'loginCtrl'
            })
            .state('match', {
                url         : '/match',
                templateUrl : 'app/views/match.html',
                controller  : 'matchCtrl'
            })
            .state('profile', {
                url         : '/profile',
                templateUrl : 'app/views/profile.html',
                controller  : 'profileCtrl'
            })
            .state('inscription', {
                url         : '/inscription',
                templateUrl : 'app/views/inscription.html',
                controller  : 'profileCtrl'
            })
    });