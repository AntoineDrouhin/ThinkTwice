/**
 * Created by aureliengarret on 30/06/2016.
 */

var Personne = function (data) {
    this.data = data;
}


Personne.prototype.insert = function (d, ret,  next) {

    console.log("insert personne");
    console.log (d);

    var insert = "insert into personne(nom, prenom, login, mdp, mail) values (?,?,?,?,?)";

    var con = global.con();
    con.query(insert, [d.nom, d.prenom, d.login, d.mdp, d.mail], function(err, res) {
        if (err) {
            console.log(err);
            next(res, true);
            return;
        }
        next(ret, false);

    });
}

Personne.prototype.fill = function(d) {
    // pour le profil et completer la personne
}

module.exports = Personne;