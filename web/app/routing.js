'use strict';

angular.module('thinktwiceApp')
    .config(function ($stateProvider,$urlRouterProvider) {
        $urlrouterProvider.otherwise('/login');

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
            .state('match', {
                url         : '/profile',
                templateUrl : 'app/views/profile.html',
                controller  : 'profileCtrl'
            })
    });