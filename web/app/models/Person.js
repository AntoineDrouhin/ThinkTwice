'use strict';

angular.module('myResumeApp')
    .factory('Person', function (ConfigResumeApp, $filter, Model) {

        var Person = function Person(element) {
            Model.call(this, element, 'Person');
            this.uri = ConfigResumeApp.getUri('uri_resume');

            // ---- SCHEMA DEFINITION
            if (element) {
                this.id = element._id;
                this.name = element.name;
                this.birthDate = element.birthDate;
                this.photo = element.photo;
                this.contact = element.contact;
            }

            // ------- Apply model extend
            Person.prototype = Object.create(Model.prototype);
            Person.prototype.constructor = Person;

            return Person;
        }

    });