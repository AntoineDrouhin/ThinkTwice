/**
 * Created by aureliengarret on 30/06/2016.
 */

var Personnalite = function (id_personne, reponses) {
    this.id_personne = id_personne;
    this.reponses = reponses;
}


Personnalite.prototype.calc = function () {
    console.log("Calc Personnalite in progress...");

    //delete personne_facette de cette personne
    var query = "delete from personne_personnalite where personneid = ?";
    var con = global.con();
    var $this = this;
    con.query(query,[$this.id_personne],function(err,rows){
        console.log(err);
        if(err){
            Utils.info(err);

        }

        var query = "select * from personne_facette where personneid=?";
        con.query(query,[$this.id_personne],function(err,rows){
            console.log(err);
            if(err){
                Utils.info(err);

            }
            for(var i =0; i<rows.length;i++){
                rows[i].facetteid =  rows[i].facetteid.substring(0,1);
            }
            var tabPersonne_facette = rows;
            query = "select id from personnalite";
            con.query(query,function(err,rows){
                console.log(err);
                if(err){
                    Utils.info(err);

                }

                var mapPerso = {};


                //Initialisation de ma map avec comme clef l'id de la facette en en value une initialisation à 0
                for(var i = 0; i<rows.length;i++){
                    mapPerso[rows[i].id]=0;
                }

                for(var i = 0; i<tabPersonne_facette.length;i++){
                    mapPerso[tabPersonne_facette[i].facetteid]= mapPerso[tabPersonne_facette[i].facetteid] + tabPersonne_facette[i].score;
                }
                //insert dans personne_facette
                for (var val in mapPerso) {
                    query = "INSERT INTO personne_personnalite (score,personnaliteid,personneid) VALUES (?,?,?)";
                    var score = mapPerso[val];
                    con.query(query,[score, val, $this.id_personne],function(err,rows){
                        console.log(err);
                        if(err){
                            Utils.info(err);

                        }
                    })
                }

            })
        })
    })
    console.log("end");
}

module.exports = Personnalite;