/**
 * Created by Geoffrey on 7/1/2016.
 */

var Ttmatch = function (id_personne) {
    this.id_personne = id_personne;
}


Ttmatch.prototype.matching = function () {
    console.log("matching in progress...");
    var query = 'select * from personne p, interet i where p.id = i.personneid and p.id = ?';
    var con = global.con();
    var $this = this;
    con.query(query,[$this.id_personne],function(err,rows){
        if(err){
            Utils.info(err);

        }
        var tabPersonneInteret = rows; 
        var ageMax = value_age × 15 ÷ 100
        var ageMin = value_age − value_age × 15/100;
        var tailleMax = 
        var tailleMin =
        SELECT * FROM personne where

    })

}

// A CORRIGER AVEC AUREL
//module.exports = ttmatch;