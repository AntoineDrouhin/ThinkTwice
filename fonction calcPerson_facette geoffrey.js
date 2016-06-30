

//NE PAS OUBLIER SUPPIRMER ANCIENNE OCCURENCE
calculPersonne_facette{
	//recuperation de typeBaremeid et de facetteid
	select id, typeBaremeid, facetteid
	FROM question;
	
	var parametreRep = new Array();
	parametreRep['id'] = new Array('FD','D','N','A','FA');
	parametreRep['decroissant'] = new Array(4,3,2,1,0);
	parametreRep['croissant'] = new Array(0,1,2,3,4);

//FACETTE
	var mapFacette = {};
	mapFacette =  select * from facette;
	//set default value = 0;
	for(var key in mapFacette){
		mapFacette[key]=0;
	}

	for(var i = 0; i<=tabQ.length;i++){
		var indexTypeBar = tabQ['typeBareme'][i];
		mapFacette[tabQ['facetteid'][i]]+=parametreReptabQ[indexTypeBar][i];	
	}
	
	//insert
	for(var key in mapFacette){
		INSERT INTO personne_facette (score,facetteid,personneid) 
		VALUES (mapFacette[key],key,@personneid);
	}

	//END FACETTE
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	// PERSONALITE
	for(var i = 0; i<=tabQ.length;i++){
		tabQ[facetteid][i]=tabQ[facetteid][i].substring(0,1);
	}
	var mapPersonalite = {};
	mapPersonalite =  select * from personalie;
	//set default value = 0;
	for(var key in mapPersonalite){
		mapPersonalite[key]=0;
	}
	
	for(var i = 0; i<=tabQ.length;i++){
			mapPersonalite[tabQ['facetteid'][i]]+=tabQ['reponse'][i];	
	}
	
	//insert
	for(var key in mapPersonalite){
		INSERT INTO personne_personalite (score,personaliteid,personneid) 
		VALUES (mapPersonalite[key],key,@personneid);
	}
	//END PERSONALITE
}