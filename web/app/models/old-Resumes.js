'use strict';

angular.module('myResumeApp')
    .factory('Resumes', function(Collection, Resume,ConfigResumeApp){
   

    var resumes = function resumes(elements){
        Collection.call(this, Resume);
        this.uri    = ConfigResumeApp.getUri('uri_resume');
        this.addItems(elements);
    };

    resumes.prototype = Object.create(Collection.prototype);
    resumes.prototype.constructor = resumes;

    return resumes;

});
