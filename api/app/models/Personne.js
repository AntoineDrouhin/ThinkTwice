
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
            next(ret, true);
            return;
        }
        next(ret, false);

    });
}

Personne.prototype.update = function(d, ret, next) {
    console.log("update personne");
    console.log (d);

    var update = "update personne set dateDeNaissance = ?, taille = ?, adresse = ?, cp = ?, ville = ?, situationFamiliale = ?, niveauEtude = ?, origine = ?, universite = ?, loisir = ?, metier = ?, sexe = ? where id = ?";

    var con = global.con();
    con.query(update,
                [d.dateDeNaissance,
                d.taille,
                d.adresse,
                d.cp,
                d.ville,
                d.situationFamiliale,
                d.niveauEtude,
                    d.origine,
                d.universite,
                d.loisir,
                d.metier,
                d.sexe,
                d.id_personne],
                function(err, res) {
                    if (err) {
                        console.log(err);
                        next(ret, true);
                        return;
                    }
                    next(ret, false);
                }
    );
}

module.exports = Personne;