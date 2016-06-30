'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('profilCtrl', function($scope, $http, $mdDialog, $mdMedia){

        var idUser = window.localStorage.getItem("thinktwice_userId");

        // Recuperer les questions
        $http({
            method: 'GET',
            url: 'http://0.0.0.0:3000/question/'
        }).then(function successCallback(response) {
            $scope.profil_question = response.data;
        }, function errorCallback(response) {
            $scope.profil_question = {error: true}
            alert("error Recuperation questions, reponse = " + response);
        });


        // Pousser les réponses au questionnaire
        $scope.pushData = function(){
            var data = {
                id_personne : '',
                reponses : []
            };

            $(".radioQuestion:checked").each(function (i,v) {
                var id = $(this).attr("id");
                data.reponses.push({
                    'id':id.substring(11, id.length - 1),
                    'reponse': $(this).val()
                });
            });

            $http({
                method: 'POST',
                url: 'http://0.0.0.0:3000/reponse',
                headers: {
                    'Content-Type': undefined
                },
                data : data
            }).then(function successCallback(response){

            }, function errorCallback(response){
                console.log(response)
            });
        };


        // gestion de personne
        $scope.personne = {
            "dateDeNaissance": "",
            "taille" : 0,
            "adresse" : "",
            "cp" : "",
            "ville": "",
            "situationFamiliale" : "",
            "niveauEtude" : 0,
            "origine" : "",
            "universite" : "",
            "loisir" : "",
            "metier" : "",
            "sexe" : "",
            "id_personne" : 0
        };

        $scope.postPersonne = function () {

            $http({
                method: 'POST',
                url: 'http://0.0.0.0:3000/personne/',
                data : $scope.personne
            }).then(function successCallback(response){

            }, function errorCallback(response){
                console.log(response)
            });
        };

        $http({
            method: 'POST',
            url: 'http://0.0.0.0:3000/interet/' + idUser,
            data : $scope.personne
        }).then(function successCallback(response){
            $scope.interet = response;
        }, function errorCallback(response){
            $scope.interet = {
                "personneid" : "",
                "age" : 0,
                "taille" : 0,
                "niveauEtude" :0,
                "sexe" : "",
                "facetteid1" :"",
                "facetteid2" : "",
                "facetteid3" : "",
                "origine1" : "",
                "origine2" : "",
                "origine3" : ""
            };
        });
        $scope.interet = {

        };

        //gestion de interet
        $scope.postInteret = function () {

            $http({
                method: 'DELETE',
                url: 'http://0.0.0.0:3000/interet/' + idUser
            }).then(function successCallback(response){
                $http({
                    method: 'POST',
                    url: 'http://0.0.0.0:3000/interet/' + idUser,
                    data : $scope.personne
                }).then(function successCallback(response){

                }, function errorCallback(response){
                    console.log(response)
                });
            }, function errorCallback(response){
                console.log(response)
            });

        };

    });