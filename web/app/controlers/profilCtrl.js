'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('profilCtrl', function($scope, $http, $mdDialog, $mdMedia){


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
        // TODO : gerer le cas ou on a pas répondu à tout
        $scope.pushData = function(){
            var data = {
                id_personne : '',
                reponses : []
            }

            $(".radioQuestion:checked").each(function (i,v) {
                var id = $(this).attr("id");
                data.reponses.push({
                    'id':id.substring(11, id.length - 1),
                    'reponse': $(this).val()
                });
            })

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
        }
        
        //TODO : put
        //d.dateDeNaissance,
          //  d.taille,
            //d.adresse,
            //d.cp,
            //d.ville,
            //d.situationFamiliale,
            //.niveauEtude,
            //d.universite,
            //d.loisir,
            //d.metier,
            //d.sexe,
            //d.id_personne

    });