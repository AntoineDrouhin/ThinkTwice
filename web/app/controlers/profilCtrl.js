'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('profilCtrl', function($scope, $state, $http, $mdDialog, $mdMedia, WEBAPP_CONFIG, uploadImage){

        var idUser = window.localStorage.getItem("thinktwice_userId");
        $scope.personne = {};

        //GESTION IMAGE
            //Télécharger l'avatar
        $http({
            method: 'GET',
            url: WEBAPP_CONFIG.api_route + '/avatar/from/' + idUser
        }).then(function successCallback(response){
            $scope.linkSrcImage = response.data.link;

        }, function errorCallback(response){
            $scope.linkSrcImage = '/images/placeholder.jpg';
        });

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

            uploadImage($scope.picFile, WEBAPP_CONFIG.api_route + '/avatar/to/' + idUser, function (response, data) {
                if (response) {
                    // ---- Remove avatar uplaoder
                    $scope.avatarUploaded = false;
                    // ---- Refresh the link to current avatar
                    //$scope.user.toRefresh = moment().valueOf();
                    // ---- Little message
                    //ToastService('200', "Mise a jour de l'avatar utilisateur");

                    $scope.linkSrcImage = data.link;


                } else {
                    // ---- Error
                    //ToastService('400', "Erreur durant l'upload de la photo");
                }
            });
        };

        // FIN Gestion image



        // Recuperer les interets
        $http({
            method: 'GET',
            url: WEBAPP_CONFIG.api_route + '/facette/'
        }).then(function successCallback(response){
            $scope.facette = response.data;
        }, function errorCallback(response){
            $scope.facette = {error: true};
            // alert("Erreur récupération facettes, reponse = " + response);
        });

        // Recuperer les questions
        $http({
            method: 'GET',
            url: WEBAPP_CONFIG.api_route + '/question/'
        }).then(function successCallback(response) {
            $scope.profil_question = response.data;
        }, function errorCallback(response) {
            $scope.profil_question = {error: true};
            // alert("error Recuperation questions, reponse = " + response);
        });

        // Pousser les réponses au questionnaire
        $scope.pushData = function(){
            var data = {
                id_personne : idUser,
                reponses : []
            };

            $(".radioQuestion:checked").each(function (i,v) {
                var id = $(this).attr("id");
                data.reponses.push({
                    'id': id.substring(11, id.length),
                    'reponse': $(this).val()
                });
            });

            console.log(JSON.stringify(data));
            $http({
                method: 'POST',
                dataType: 'json',
                url: WEBAPP_CONFIG.api_route + '/reponse',
                headers: {
                    'Content-Type': 'application/json'
                },
                data : data
            }).then(function successCallback(response){

                $scope.progressBarQuestions = 1;
                $scope.updateProgressBar();

            }, function errorCallback(response){
                console.log(response)
            });
        };

        // gestion de personne

        // Recuperer les informations de personne
        $http({
            method: 'GET',
            url: WEBAPP_CONFIG.api_route + '/personne/' + idUser,
            data : $scope.personne
        }).then(function successCallback(response){
            $scope.personne = response.data[0];
            // $scope.personneTmp = angular.copy($scope.personne);
        }, function errorCallback(){

        });

        // Fonction de validation du formulaire de personne
        $scope.postPersonne = function () {

            $scope.personneTmp.personne_id = idUser;

            var fakepersonne = {
                "dateDeNaissance" : "",
                "taille": 0,
                "adresse": "",
                "cp": "",
                "ville": "",
                "situationFamiliale": "",
                "niveauEtude": 0,
                "origine": "",
                "universite": "",
                "loisir": "",
                "metier": "",
                "sexe": "",
                "id_personne": idUser
            };

            var p = $.extend(fakepersonne , $scope.personneTmp);

            $http({
                method: 'PUT',
                url: WEBAPP_CONFIG.api_route + '/personne/',
                data : p
            }).then(function successCallback(response){

                $scope.progressBarProfil = 1;
                $scope.updateProgressBar();

            }, function errorCallback(response){
                console.log(response)
            });
        };

        $http({
            method: 'GET',
            url: WEBAPP_CONFIG.api_route + '/facette',
            data : $scope.personne
        }).then(function successCallback(response){

            $scope.facette = response.data;
            
        }, function errorCallback(){

        });
        // Recuperer l'interet
/*        $http({
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
*/
        // Validation du formulaire d'interet
        $scope.postInteret = function () {

            var interetTmp = angular.copy($scope.interet);
            interetTmp.facetteid1 = $scope.interet.facetteid1.id;
            interetTmp.facetteid2 = $scope.interet.facetteid2.id;
            interetTmp.facetteid3 = $scope.interet.facetteid3.id;
            interetTmp.niveauEtude = "3";
            interetTmp.personneid = idUser;




            $http({
                method: 'DELETE',
                url: WEBAPP_CONFIG.api_route + '/interet/',
                dataType: 'json',
                data : {
                    personneid : idUser
                },
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function successCallback(response){
                console.log($scope.interet);
                $http({
                    method: 'POST',
                    url: WEBAPP_CONFIG.api_route + '/interet/',
                    data : interetTmp
                }).then(function successCallback(response){
                    $scope.progressBarInterets = 1;
                    $scope.updateProgressBar();
                }, function errorCallback(response){
                    console.log(response)
                });
            }, function errorCallback(response){
                console.log(response)
            });

        };

        //GESTION PROGRESSBAR
        //console.log("localStorage")
        console.log(window.localStorage.getItem("tt_profilcomplete_"+idUser));
        if(window.localStorage.getItem("tt_profilcomplete_"+idUser) == undefined){
            console.log("profil incomplet (pas de local storage)");
            window.localStorage.setItem("tt_profilcomplete", "0");
            $scope.progressBarProfil = 0;
            $scope.progressBarInterets = 0;
            $scope.progressBarQuestions = 0;
            $scope.progressBarMax = 3;
            $scope.progressBarValue = 0;
            $scope.progressBarType = "danger";

        }
        else if (window.localStorage.getItem("tt_profilcomplete_"+idUser) == 3){
            console.log("profil complet (3)");
            $scope.progressBarProfil = 1;
            $scope.progressBarInterets = 1;
            $scope.progressBarQuestions = 1;
            $scope.progressBarMax = 3;
            $scope.progressBarValue = 0;
            $scope.progressBarType = "success";
        }
        else if (window.localStorage.getItem("tt_profilcomplete_"+idUser) == 2){
            console.log("profil incomplet (2)");

            $scope.progressBarProfil = 1;
            $scope.progressBarInterets = 1;
            $scope.progressBarQuestions = 0;
            $scope.progressBarMax = 3;
            $scope.progressBarValue = 0;
            $scope.progressBarType = "danger";
        }
        else if (window.localStorage.getItem("tt_profilcomplete_"+idUser) == 1){
            console.log("profil incomplet (1)");

            $scope.progressBarProfil = 1;
            $scope.progressBarInterets = 0;
            $scope.progressBarQuestions = 0;
            $scope.progressBarMax = 3;
            $scope.progressBarValue = 0;
            $scope.progressBarType = "danger";
        }
        else{
            console.log("profil incomplet (0)");

            $scope.progressBarProfil = 0;
            $scope.progressBarInterets = 0;
            $scope.progressBarQuestions = 0;
            $scope.progressBarMax = 3;
            $scope.progressBarValue = 0;
            $scope.progressBarType = "danger";

        }

        $scope.updateProgressBar = function() {

            $scope.progressBarValue =
                $scope.progressBarProfil
                +   $scope.progressBarInterets
                +   $scope.progressBarQuestions;
            window.localStorage.setItem("tt_profilcomplete_"+idUser, $scope.progressBarValue);
            if($scope.progressBarValue < $scope.progressBarMax)
                $scope.progressBarType = "danger";
            else
                $scope.progressBarType = "success";

            $scope.progressBarWidth = ($scope.progressBarValue/$scope.progressBarMax).toFixed(2) *100
        };

        $scope.updateProgressBar();

    });

