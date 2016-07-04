/**
 * Created by Geoffrey on 7/1/2016.
 */

var Ttmatch = function (id_personne) {
    this.id_personne = id_personne;
}


Ttmatch.prototype.matching = function () {
    var json="";
    console.log("matching in progress...");
    console.log("personneid: ");
    console.log(this.id_personne);
    var query = 'select * from personne p, interet i where p.id = i.personneid and p.id = ?';
    var con = global.con();
    var $this = this;
    con.query(query,[$this.id_personne],function(err,rows){
        if(err){
            Utils.info(err);

        }
        var tabPersonneInteret = rows;

        console.log(tabPersonneInteret);
        //ar ladate=new Date()
        //var anneeEnCours =ladate.getFullYear();
        //console.log(anneeEnCours);
        //var dateOfBirth = new Date(tabPersonneInteret[0].dateDeNaissance.substring(5,9), tabPersonneInteret[0].dateDeNaissance.substring(2,4), tabPersonneInteret[0].dateDeNaissance.substring(0,2));
        //console.log(dateOfBirth);
        //var agePersonne = _calculateAge(dateOfBirth);
        //console.log(agePersonne);

        var tabPersonneInteret = rows;
        var paramQuery = new Array();
        console.log(tabPersonneInteret);
        //console.log(agePersonne);
        console.log(tabPersonneInteret[0].taille);
        //var ageMax = 999;
       // var ageMin = 0;
        //if(agePersonne != null){
        //    ageMax = tabPersonneInteret[0].age + tabPersonneInteret[0].age * (15 / 100);
        //    ageMin = tabPersonneInteret[0].age - (tabPersonneInteret[0].age * (15/100));
        //}
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
        //paramQuery.push(ageMin);
        //paramQuery.push(ageMax);
        paramQuery.push(tailleMin);
        paramQuery.push(tailleMax);
        paramQuery.push(parseInt(niveauEtude));

        var origine1;
        var origine2;
        var origine3;
        var queryOrigine='';
        if(tabPersonneInteret[0].origine1 != null){
            origine1 = tabPersonneInteret[0].origine1;
             queryOrigine += ' AND ( origine = ? ';
             paramQuery.push(parseInt(origine1));
            if(tabPersonneInteret[0].origine2 != null){
                origine2 = tabPersonneInteret[0].origine2;
                 queryOrigine += ' OR origine = ? ';
                paramQuery.push(parseInt(origine2));
                if(tabPersonneInteret[0].origine3 != null){
                    origine3 = tabPersonneInteret[0].origine3;
                    queryOrigine += ' OR origine = ? ';
                    paramQuery.push(parseInt(origine3));
                }
            }
            queryOrigine += ' ) ';
        }


        //AND (age >= ? OR age <= ? )
        query = 'select * from personne where sexe = ? AND ( taille >= ? OR taille <= ? ) AND niveauEtude >= ? ';
        query += queryOrigine;
        //Pour pas que la personne match avec sois meme
        paramQuery.push(parseInt($this.id_personne));
        query += ' AND id != ? '
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
            console.log(rows.length);
            console.log(tabRepPersonne.length);
            query = 'select * from personne_personnalite where personneid=  ?';
            con.query(query,[$this.id_personne],function(err,rows){
                console.log(err);
                if(err){
                    Utils.info(err);

                }
                var tabMatch = new Array();
                var tabPersonnalite = rows;
                console.log(tabPersonnalite);
                var tabPersonnaliteRep;
                if(tabRepPersonne.length>0){
                    var paramQuery2 = new Array();
                    query = 'select * from personne_personnalite where  1=1 ';

                    for(var i =0; i<tabRepPersonne.length;i++){
                        query +=" AND "
                        query += " personneid=  ? "
                        paramQuery2.push(tabRepPersonne[i].id)

                    }

                    con.query(query,[paramQuery2],function(err,rows){
                        console.log(err);

                        if(err){
                            Utils.info(err);

                        }
                        console.log(rows);
                        tabPersonnaliteRep=rows;
                        var personneNotMatch = new Array();
                        var k=0;
                        for(var j =0; j<tabPersonnaliteRep.length;j++){

                                console.log(j);
                                if(k>tabPersonnalite.length){
                                    k=0;

                                }

                                var personnaliteMax= tabPersonnalite[k].score + tabPersonnalite[k].score* (10 / 100);
                                var personnaliteMin = tabPersonnalite[k].score - tabPersonnalite[k].score * (10 / 100);
                                if(tabPersonnaliteRep[j].score < personnaliteMin || tabPersonnaliteRep[j].score > personnaliteMax){
                                    personneNotMatch.push(tabPersonnaliteRep[j].id);
                                }
                            k++;
                        }

                        for(var i =0; i<tabRepPersonne.length;i++){
                            for(var j =0; j<personneNotMatch.length;j++){
                                if(tabRepPersonne[i].id==personneNotMatch[j]){
                                    tabRepPersonne[i]=null;
                                }
                            }
                        }
                        //get current date
                        var today = new Date();
                        var dd = today.getDate();
                        var MM = today.getMonth()+1; //January is 0!
                        var yyyy = today.getFullYear();
                        var hh = today.getHours();
                        var mm = today.getMinutes();
                        var ss = today.getSeconds();
                        if(hh<10) {
                            hh='0'+hh
                        }
                        if(mm<10) {
                            mm='0'+mm
                        }
                        if(ss<10) {
                            ss='0'+ss
                        }

                        if(dd<10) {
                            dd='0'+dd
                        }

                        if(MM<10) {
                            MM='0'+MM
                        }

                        today = yyyy+MM+dd+hh+mm+ss;

                        /// on arrive jamais ici donc on ne renvoit jamais de match
                        // et donc on ne fait jamais d'insert de match
                        console.log("Insert matching");
                        var insert = "insert into ttmatch(personneid1, personneid2, date_debut) values(?,?,?)";
                        con.query(insert,[$this.id_personne,tabRepPersonne[0].id,today],function(err,rows) {
                            console.log(err);
                            if(err){
                                Utils.info(err);

                            }
                            console.log("matching returns");
                            console.log(rows);
                        });


                    })

                }else{

                    // Geoffreyninou :
                    // tu peux faire ton bail de match aléatoire sur le sexe choisi ici
                    // mais surtout, si aucun match est encore possible, exemple nombre de personne impaire dans la base
                    query = 'select * from personne where sexe = ? ';
                    console.log(query);
                    con.query(query,tabPersonneInteret[0].sexe,function(err,rows){
                        console.log(err);
                        if(err){
                            Utils.info(err);

                        }

                        if(rows.length > 0){
                            var idRandom = Math.round(Math.random()*rows.length);
                            console.log(rows);
                            console.log(idRandom);
                            var insert = "insert into ttmatch(personneid1, personneid2, date_debut) values(?,?,?)";
                            con.query(insert,[$this.id_personne,rows[idRandom].id,today],function(err,rows) {
                                console.log(err);
                                if(err){
                                    Utils.info(err);

                                }
                                console.log("matching returns");
                                console.log(rows);
                            });

                        }else{
                            // renvoi moi toujours ce json pour que je puisse renvoyer un 400
                            return {"nomatch" : "true"};

                        }

                        })


                }





            })
        })
    })

}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Ttmatch;