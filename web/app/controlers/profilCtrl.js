'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('profilCtrl', function($scope, $http, $mdDialog, $mdMedia, WEBAPP_CONFIG){

        var idUser = window.localStorage.getItem("thinktwice_userId");

        // Recuperer les interets
        $http({
            method: 'GET',
            url: WEBAPP_CONFIG.api_route + '/interet'
        }).then(function successCallback(response){
            $scope.interet = response.data;

        }, function errorCallback(response){
            $scope.interet = {error: true};
            alert("Erreur récupération interet, reponse = " + response);
        });

        // Recuperer les questions
        $http({
            method: 'GET',
            url: WEBAPP_CONFIG.api_route + '/question/'
        }).then(function successCallback(response) {
            $scope.profil_question = response.data;
        }, function errorCallback(response) {
            $scope.profil_question = {error: true};
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
                url: WEBAPP_CONFIG.api_route + '/reponse',
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
                url: WEBAPP_CONFIG.api_route + '/personne/',
                data : $scope.personne
            }).then(function successCallback(response){

            }, function errorCallback(response){
                console.log(response)
            });
        };

        $http({
            method: 'POST',
            url: WEBAPP_CONFIG.api_route + '/interet/' + idUser,
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
                url: WEBAPP_CONFIG.api_route + '/interet/' + idUser
            }).then(function successCallback(response){
                $http({
                    method: 'POST',
                    url: WEBAPP_CONFIG.api_route + '/interet/' + idUser,
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