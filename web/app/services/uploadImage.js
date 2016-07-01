'use strict';

angular.module('thinktwiceApp')
    .service('uploadImage', function($timeout, Upload){

        $http.defaults.headers.common.Authorization = window.localStorage.getItem("thinktwice_token");

        return function(file, path,callback){

            file.upload = Upload.upload({
                url     : path,
                method  : 'POST',
                file : file,
                fields : { type : file.type.split('/')[1]}
            });

            file.upload.then(function(response){
                $timeout(function () {
                    file.result = response.data;
                    return callback(true);
                });
            }, function(reason){
                new ToastService(reason);
                return callback(false);
            });

            file.upload.progress(function(evt){
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            })
        }

    });