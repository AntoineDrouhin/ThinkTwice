/**
 * Created by aureliengarret on 30/06/2016.
 */

var Personnalite = function (id_personne, reponses) {
    this.id_personne = id_personne;
    this.reponses = reponses;
}


Personnalite.prototype.calc = function () {
    var a = 1;
    console.log("Calc Personnalite in progress...");
}

module.exports = Personnalite;