/**
 * Created by Geoffrey on 7/1/2016.
 */

var Ttmatch = function (id_personne) {
    this.id_personne = id_personne;
}


Ttmatch.prototype.matching = function () {
    console.log("matching in progress...");
    console.log("personneid: ");

    var query = 'select * from personne p, interet i where p.id = i.personneid and p.id = ?';
    var con = global.con();
    var $this = this;
    con.query(query,[$this.id_personne],function(err,rows){
        if(err){
            Utils.info(err);

        }
        var tabPersonneInteret = rows;
        var paramQuery = new Array();
        console.log(tabPersonneInteret);
        console.log(tabPersonneInteret[0].age);
        console.log(tabPersonneInteret[0].taille);
        var ageMax = 999;
        var ageMin = 0;
        if(tabPersonneInteret[0].age != null){
            ageMax = tabPersonneInteret[0].age + tabPersonneInteret[0].age * (15 / 100);
            ageMin = tabPersonneInteret[0].age - (tabPersonneInteret[0].age * (15/100));
        }
        var tailleMax = 999;
        var tailleMin = 0;
        if(tabPersonneInteret[0].taille != null){
            tailleMax = tabPersonneInteret[0].taille + (tabPersonneInteret[0].taille * (5/100));
            tailleMin = tabPersonneInteret[0].taille - (tabPersonneInteret[0].taille * (5 / 100));
        }
        var niveauEtude = -1;
        if(tabPersonneInteret[0].niveauEtude != null){
            niveauEtude = tabPersonneInteret[0].niveauEtude;

        }
        paramQuery.push(tabPersonneInteret[0].sexe);
        paramQuery.push(ageMin);
        paramQuery.push(ageMax);
        paramQuery.push(tailleMin);
        paramQuery.push(tailleMax);
        paramQuery.push(niveauEtude);

        var origine1;
        var origine2;
        var origine3;
        var queryOrigine='';
        if(tabPersonneInteret[0].origine1 != null){
            origine1 = tabPersonneInteret[0].origine1;
             queryOrigine += ' AND ( origine1 = ? ';
             paramQuery.push(origine1);
            if(tabPersonneInteret[0].origine2 != null){
                origine2 = tabPersonneInteret[0].origine2;
                 queryOrigine += ' OR origine2 = ? ';
                paramQuery.push(origine2);
                if(tabPersonneInteret[0].origine3 != null){
                    origine3 = tabPersonneInteret[0].origine3;
                    queryOrigine += ' OR origine3 = ? ';
                    paramQuery.push(origine3);
                }
            }
            queryOrigine += ' ) ';
        }



        query = 'select * from personne where sexe = ? AND (age >= ? OR age <= ? ) AND (taille >= ? OR taille <= ? ) AND niveauEtude >= ? ';
        query += queryOrigine;
        console.log(query);
        console.log(paramQuery);
        con.query(query,paramQuery,function(err,rows){
            console.log(err);
            if(err){
                Utils.info(err);

            }

            console.log('RESULTAT MATCH 1:');
            console.log(rows);

            var tabRepPersonne = rows;
            query = 'select * from personne_personnalite where personneid=  ?';
            con.query(query,[$this.id_personne],function(err,rows){
                console.log(err);
                if(err){
                    Utils.info(err);

                }
                var tabMatchPersonnalite;
                var tabPersonnalite = rows;
                var tabPersonnaliteRep = new Array();
                query = 'select * from personne_personnalite where personneid=  ?';
                for(var i =0; i<tabRepPersonne.length;i++){

                    con.query(query,[tabRepPersonne[i].id],function(err,rows){
                        console.log(err);
                        if(err){
                            Utils.info(err);

                        }
                        tabPersonnaliteRep.push(rows);
                    })
                }


                for(var i =0; i<tabPersonnaliteRep.length;i++){
                    for(var i =0; i<tabPersonnaliteRep.length;i++){

                    }
                }


            })
        })
    })

}


module.exports = Ttmatch;