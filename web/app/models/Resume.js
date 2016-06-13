'use strict';

angular.module('myResumeApp')
    .factory('Resume', function (ConfigResumeApp, $filter, Model) {

        var Resume = function Resume (element) {
            
            Model.call(this, element, 'resume');
            this.uri = ConfigResumeApp.getUri('uri_resume');


            // ---- SCHEMA DEFINITION
            if(element) {
                this.id        = element._id;
                this.person    = element.person;
                this.title     = element.title;

                this.experiences = element.experiences;
                this.educations = element.educations;
                this.hobbies = element.hobbies;
                this.competencies = element.competencies;
                this.extra = element.extra;
            }
        };

        // ------- Apply model extend
        Resume.prototype = Object.create(Model.prototype);
        Resume.prototype.constructor = Resume;

        return Resume;

    });
