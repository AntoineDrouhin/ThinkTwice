/**
 * Created by aureliengarret on 30/06/2016.
 */

var Facette = function (id_personne, reponses, next) {
    this.id_personne = id_personne;
    this.reponses = reponses;
    this.next = next;
}


Facette.prototype.calc = function () {
    console.log("Calc facette in progress...");

    //recuperation de typeBaremeid et de facetteid
    var query = "select id, typeBaremeid, facetteid FROM question";

    var con = global.con();
    var $this = this;
    con.query(query,function(err,rows){
        if(err){
            Utils.info(err);

        }
        var tabQuestion = rows;
        tabQuestion['reponses'] = new Array();
        //Initialisation de reponse
        //BEGIN:POUR TEST A REMOVE
        for(var i = 0; i<tabQuestion.length;i++){
            tabQuestion['reponses'][i] = 0;
        }
        //END:POUR TEST A REMOVE
        for(var i = 0; i<$this.reponses.length;i++){
            tabQuestion['reponses'][i] = $this.reponses[i].reponse;
        }

        query =  "select * from facette";
        con.query(query,function(err,rows){
            if(err){
                Utils.info(err);

            }
            var tabFacette = rows;
            var mapFacette = {};

            //Aide du prof pour gerer map
            //var toto = {};
            //toto['toto'] = 'ert';
            //var a = toto['toto'];
            //object.keys(toto);


            //Initialisation de ma map avec comme clef l'id de la facette en en value une initialisation à 0
            for(var i = 0; i<tabFacette.length;i++){
                mapFacette[tabFacette[i].id]=0;
            }

            var parametreRep = new Array(new Array('FD','D','N','A','FA'), new Array(4,3,2,1,0), new Array(0,1,2,3,4));
            //parametreRep['id'] = new Array('FD','D','N','A','FA');
            //parametreRep['decroissant'] = new Array(4,3,2,1,0);
            //parametreRep['croissant'] = new Array(0,1,2,3,4);
            //var indexTypeBar = '';


            for(var i = 0; i<tabQuestion.length;i++){
                /*if(tabQuestion[i].typeBaremeid == 1){
                    mapFacette[tabQuestion[i].facetteid]=mapFacette[tabQuestion[i].facetteid]+parametreRep[tabQuestion[i].reponses].decroissant;
                }else if(tabQuestion[i].typeBaremeid == 2){
                    mapFacette[tabQuestion[i].facetteid]=mapFacette[tabQuestion[i].facetteid]+parametreRep[tabQuestion[i].reponses].croissant;
                }*/

                //mapFacette[tabQuestion['facetteid'][i]]+=parametreRep[tabQuestion[indexTypeBar][i]];

                mapFacette[tabQuestion[i].facetteid]=mapFacette[tabQuestion[i].facetteid]+parametreRep[tabQuestion[i].typeBaremeid][tabQuestion.reponses[i]];
                /*var facetteid = tabQuestion[i].facetteid;
                var mapfacetteid = mapFacette[facetteid];
                var baremeid= tabQuestion[i].typeBaremeid;
                var reponse = tabQuestion.reponses[i];
                var parametreRepBaremeidRep = parametreRep[baremeid][reponse];
                mapFacette[facetteid]=mapfacetteid+parametreRepBaremeidRep;*/

            }

            //insert
            // AJOUTER DELETE person_facette WHERE personneid=$this.id_personne;
            var j = 0;
            for (var val in mapFacette) {
                query = "INSERT INTO personne_facette (score,facetteid,personneid) VALUES (?,?,?)";
                var score = mapFacette[val];
                con.query(query,[score, val, $this.id_personne],function(err,rows){
                    if(err){
                        Utils.info(err);

                    }
                    // exec le calcul de personnalite




                })

                if(j>=tabFacette.length){
                    this.next(this.id_personne, this.reponses);
                }
                j++;
            }



        })
    })


}

module.exports = Facette;