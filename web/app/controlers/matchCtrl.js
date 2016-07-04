'use strict';
var current_resume;
angular.module('thinktwiceApp')
    .controller('matchCtrl', function($scope, $state, $http, $mdDialog, $mdMedia, WEBAPP_CONFIG){

        var idUser = window.localStorage.getItem("thinktwice_userId");

        if(window.localStorage.getItem("tt_profilcomplete_" + idUser) < 3){
            swal(
                "Votre profil est incomplet",
                "Merci de completer votre profil pour que nous puissions vous trouver le match parfait",
                "warning"
            );
            $state.transitionTo('profil');
        }


        // Aller chercher les informations sur la personne
        if(window.localStorage.getItem("tt_profilcomplete_" + idUser) >= 3){
            $http({
                method: 'GET',
                url: WEBAPP_CONFIG.api_route + '/personne/' + idUser + '/ttmatch'
            }).then(function successCallback(response){
                $http({
                    method: 'GET',
                    url: WEBAPP_CONFIG.api_route + '/personne/' + response.data.matchPersonId
                }).then(function successCallback(response){
                    $scope.personne = response.data[0];
                    var origine = $scope.personne.origine;
                    var etude = $scope.personne.niveauEtude;
                    switch(parseInt(origine)) {
                        case 1 :
                            $scope.personne.origine= 'Européene';
                            break;
                        case 2 :
                            $scope.personne.origine = "Africaine";
                            break;
                        case 3 :
                            $scope.personne.origine = "Asiatique";
                            break;
                        case 4 :
                            $scope.personne.origine = "Arabe";
                            break;
                        case 5 :
                            $scope.personne.origine = "Indienne";
                            break;
                        case 6 :
                            $scope.personne.origine = "Autres";
                            break;
                        default:
                            break;
                    }
                    switch(etude) {
                        case 1 :
                            $scope.personne.niveauEtude = 'Aucun';
                            break;
                        case 2 :
                            $scope.personne.niveauEtude = "CAP/BEP";
                            break;
                        case 3 :
                            $scope.personne.niveauEtude = "BAC";
                            break;
                        case 4 :
                            $scope.personne.niveauEtude = "BAC+2";
                            break;
                        case 5 :
                            $scope.personne.niveauEtude = "BAC+3/4";
                            break;
                        case 6 :
                            $scope.personne.niveauEtude = "BAC+5 et +";
                            break;
                        default:
                            break;
                    }
                }, function errorCallback(response){
                });
                $http({
                    method: 'GET',
                    url: WEBAPP_CONFIG.api_route + '/avatar/from/' + response.data.matchPersonId
                }).then(function successCallback(response){
                    $scope.linkSrcImage = response.data.link;
                }, function errorCallback(response){
                    $scope.linkSrcImage = '/images/placeholder.jpg';
                });

                $("#tchat-frame").attr("src", "http://localhost:9000?token=" + response.data.id + "&user=" + idUser);
            }, function errorCallback(response){
                swal({
                        title: "Recherche d'un match",
                        text: "Cliquer pour trouver un nouveau match",
                        type: "info",
                        showCancelButton: true,
                        cancelButtonText: "Annuler",
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    },
                    function(){
                        setTimeout(function(){
                            swal("");
                        }, 4500000000);

                        searchMatch();
                    });
            });
        }

            function searchMatch(){
                setTimeout(function(){
                    $http({
                        method: 'GET',
                        url: WEBAPP_CONFIG.api_route + '/personne/' + idUser + '/ttmatch'
                    }).then(function successCallback(response){
                                swal({title: "match trouvé !!!", type: "info"}, function(){$state.reload()});
                            },
                            function errorCallback(response){
                                searchMatch()
                            });
                    }, 10000);
            }

            $scope.zapper = function () {
                $http({
                    method: 'DELETE',
                    url: WEBAPP_CONFIG.api_route + '/ttmatch/' + idUser
                }).then(function successCallback(response){
                    $state.reload();
                }, function errorCallback(response){

                });
            };
        
        

        });