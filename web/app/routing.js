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
            .state('profil', {
                url         : '/profil',
                templateUrl : 'app/views/profil.html',
                controller  : 'profilCtrl'
            })
            .state('inscription', {
                url         : '/inscription',
                templateUrl : 'app/views/inscription.html',
                controller  : 'inscriptionCtrl'
            })
    });