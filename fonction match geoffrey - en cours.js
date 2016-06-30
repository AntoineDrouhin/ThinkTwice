

match(){
	var listPersonne = getPersonnesByInteret(this.interet.age,
											this.interet.taille,
											this.interet.niveauEtudeid,
											this.interet.sexeid,
											this.interet.listOrigine_interet,	
											);
											
	var personalite = getPersonneResultPersonalite();
	listPersonne = listpersonne.getPersonalite(personalite);
	
	
	
}



getPersonneByInteret(value_age,value_taille,value_niveauEtudeId,value_sexeid,value_listOrigine_interet[]){
	
	// GET INFO PERSONNE + INTERET
	SELECT p.id, p.prenom, p.nom, p.dateDeNaissance, p.taille, p.adresse, p.cp, p.ville, p.login, p.mail, p.situationFamilialeid, p.niveauEtudeid, p.origineid, p.universiteid, p.loisirid, p.metierid, p.sexeid,
		i.id as id_interet, i.age as age_interet, i.taille as taille_interet, i.niveauEtudeid as niveauEtudeid_interet, i.sexeid as sexeid_interet, i.facetteid as facetteid_interet, i.facetteid2 as facetteid2_interet, i.facetteid3 as facetteid3_interet
		FROM personne p, interet i
		WHERE p.id = i.personneid AND
		p.id = @idPersonne
		
		
	// GET INFO PERSONNE + ORIGINE_INTERET
	SELECT * 
	FROM origine_interet
	WHERE interet_id = @id_interet
	
	
	DROP VIEW IF EXISTS view_personne_sexe+this.id;
	DROP VIEW IF EXISTS view_personne_age+this.id;
	DROP VIEW IF EXISTS view_personne_taille+this.id;
	DROP VIEW IF EXISTS view_personne_niveauEtudeId+this.id;
	DROP VIEW IF EXISTS view_personne_origine+this.id;
	
	if(value_sexeid != 1){
			CREATE VIEW view_personne_sexe+this.id AS
			SELECT *
			FROM personne
			WHERE sexeid = value_sexeid;
	}else{
			CREATE VIEW view_personne_age+this.id AS
			SELECT *
			FROM personne;			
	}
	if(value_age != null){
			CREATE VIEW view_personne_age+this.id AS
			SELECT *
			FROM view_personne_sexe+this.id
			WHERE age >= (value_age − value_age × 15/100) AND age <= value_age × 15 ÷ 100;
	}else{
			CREATE VIEW view_personne_age+this.id AS
			SELECT *
			FROM view_personne_sexe	+this.id	;	
	}
	if(value_taille != null){
			CREATE VIEW view_personne_taille+this.id AS
			SELECT *
			FROM view_personne_age+this.id
			WHERE taille >= (value_taille − value_taille × 5/100) AND taille <= value_taille × 5 ÷ 100;
	}else{
			CREATE VIEW view_personne_taille+this.id AS
			SELECT *
			FROM view_personne_age+this.id;
	}
	if(value_niveauEtudeId != null){
			CREATE VIEW view_personne_niveauEtudeId+this.id AS
			SELECT *
			FROM view_personne_taille+this.id
			WHERE niveauEtudeid >= value_niveauEtudeId;
	}else{
			CREATE VIEW view_personne_niveauEtudeId+this.id AS
			SELECT *
			FROM view_personne_taille+this.id;
	}
	var origineString ="";
	if value_listOrigine_interet.length != 0{
		origineString ="WHERE";
		origineString += " origine =";
		origineString += value_listOrigine_interet[0];
		for(int i =1; i<=value_listOrigine_interet.length;i++){
			origineString += " AND"
			origineString += " origine =";
			origineString += value_listOrigine_interet[i];	
		}
		origineString+=";";
	}
	CREATE VIEW view_personne_origine+this.id AS
	SELECT *
	FROM view_personne_niveauEtudeId+this.id 
	+origineString
			
	
	//Vérifier que chaque personalité soit dans une marge de 10% de pts
						
	//vérifier que les 3 facette préféré sois supérieur a la moyenne des facette du site. 
	
	
}