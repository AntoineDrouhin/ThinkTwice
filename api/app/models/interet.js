/**
 * Created by aureliengarret on 30/06/2016.
 */
var Interet = function () {
}


Interet.prototype.insert = function (d, ret,  next) {

    console.log("insert interet");
    console.log(d);

    var insert = "insert into interet(age,taille,niveauEtude,sexe,facetteid1,facetteid2,facetteid3,origine1,origine2,origine3, personneid)   values (?,?,?,?,?,?,?,?,?,?,?)";

    var con = global.con();
    con.query(insert,
        [
            d.age,
            d.taille,  
            d.niveauEtude,
            d.sexe,
            d.facetteid1,
            d.facetteid2,
            d.facetteid3,
            d.origine1,
            d.origine2,
            d.origine3,

            d.personneid
        ], function (err, res) {
            console.log(res);
        if (err) {
            console.log(err);
            next(ret, true);
            return;
        }
        next(ret, false);

    });
}

Interet.prototype.delete = function (d, ret,  next) {
    var personneid = d.personneid;
    console.log("delete interet");
    console.log(d);
    console.log(personneid);
    var del = "delete from interet where personneid = ?";
    var con = global.con();
    con.query(del, d.personneid, function(err, res){
        if (err) {
            console.log(err);
            next(ret, true);
            return;
        }
        next(ret, false);
    });

}

module.exports = Interet;
