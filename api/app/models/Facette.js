/**
 * Created by aureliengarret on 30/06/2016.
 */

var Facette = function (id_personne, reponses, next) {
    this.id_personne = id_personne;
    this.reponses = reponses;
    this.next = next;
}


Facette.prototype.calc = function () {
    //geoff calc
    console.log("Calc facette in progress...");


    // exec le calcul de personnalite
    this.next(this.id_personne, this.reponses);
}

module.exports = Facette;