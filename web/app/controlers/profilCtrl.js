'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('profilCtrl', function($scope, $http, $mdDialog, $mdMedia, WEBAPP_CONFIG, uploadImage){

        //GESTION IMAGE
        /**
         *
         * @type {boolean}
         */
        $scope.avatarUploaded = false;

        /**
         *
         * @param file
         */
        $scope.changeAvatar = function(file){
            $scope.picFile       = file;
            //uploadImage(file, WEBAPP_CONFIG.api_route + '/avatar/to/' + idUser)
            $scope.avatarUploaded = true;
        };

        /**
         *
         */
        $scope.cancelAvatar = function(){
            $scope.avatarUploaded    = false;
        };
        /**
         *
         */
        $scope.validAvatar = function() {
            console.log('hrhrhr')
            // TODO : décommenter la ligne suivante
            uploadImage($scope.picFile, WEBAPP_CONFIG.api_route + '/avatar/to/' + idUser, function (response) {
                if (response) {
                    // ---- Remove avatar uplaoder
                    $scope.avatarUploaded = false;
                    // ---- Refresh the link to current avatar
                    $scope.user.toRefresh = moment().valueOf();
                    // ---- Little message
                    ToastService('200', "Mise a jour de l'avatar utilisateur");
                } else {
                    // ---- Error
                    ToastService('400', "Erreur durant l'upload de la photo");
                }
            });
        };

        // FIN Gestion image

        var idUser = window.localStorage.getItem("thinktwice_userId");

        // Recuperer les interets
        $http({
            method: 'GET',
            url: WEBAPP_CONFIG.api_route + '/facette/'
        }).then(function successCallback(response){
            $scope.interet = response.data;
        }, function errorCallback(response){
            $scope.interet = {error: true};
            //alert("Erreur récupération facettes, reponse = " + response);
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

        // Recupere les informations de personne
        $http({
            method: 'GET',
            url: WEBAPP_CONFIG.api_route + '/personne/' + idUser ,
            data : $scope.personne
        }).then(function successCallback(response){
            $scope.personne = response;
        }, function errorCallback(){
            $scope.personne = {
                "dateDeNaissance": "",
                "taille" : undefined ,
                "adresse" : "",
                "cp" : "",
                "ville": "",
                "situationFamiliale" : "",
                "niveauEtude" : undefined,
                "origine" : "",
                "universite" : "",
                "loisir" : "",
                "metier" : "",
                "sexe" : "",
                "id_personne" : undefined
            };
        });

        // Fonction de validation du formulaire de personne
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

        // Recuperer l'interet
        $http({
            method: 'GET',
            url: WEBAPP_CONFIG.api_route + '/interet/' + idUser,
            data : $scope.interet
        }).then(function successCallback(response){
            $scope.interet = response;
        }, function errorCallback(response){
            $scope.interet = {
                "personneid" : "",
                "age" : undefined,
                "taille" : undefined,
                "niveauEtude" : undefined,
                "sexe" : "",
                "facetteid1" :"",
                "facetteid2" : "",
                "facetteid3" : "",
                "origine1" : "",
                "origine2" : "",
                "origine3" : ""
            };
        });

        // Validation du formulaire d'interet
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

        //Gestion de l'image
        

    });

