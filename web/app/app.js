/*
 * This file is part of ThinkTwice.
 * 
 * Copyright (c) 2016 Antoine Drouhin <antoine.drouhin@gmail.com>, Geoffrey Harrazi <geoffreyharrazi@gmail.com>, Annas Saker
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


'use strict';

angular.module('thinktwiceApp',[
    /**
     * Here declaration all external dependencies or
     */
    'ui.router',
    'ngMaterial',
    'ngFileUpload'
])
    .constant('WEBAPP_CONFIG', {
        connexion_params: {
            client_id: '0DDA0sXfGG3GyTyciIZH7E5Ze2lAyl2R==',
            client_secret: '0DDA0sXfGG3GyTyciIZH7E5Ze2lAyl2R',
            grant_type: 'password'
        },
        api_route  :'http://localhost:3000',
        uri_login : '/login',
        uri_match : '/people',
        uri_profile : '/profile'
    });