
drop database if exists thinktwice;
create database thinktwice;

use thinktwice;

drop table if exists universite;
create table universite (
	id mediumint not null auto_increment primary key
);

drop table if exists job;
create table job (
	id mediumint not null auto_increment primary key
);

drop table if exists loisir;
create table loisir (
	id mediumint not null auto_increment primary key
);

drop table if exists profil;
create table profil (
	id mediumint not null auto_increment primary key
	universite_id mediumint,
	job_id mediumint,
	loisir_id mediumint,
	foreign key (universite_id) references universite(id)
	foreign key (job_id) references job(id)
	foreign key (loisir_id) references loisir(id)
);


drop table if exists persone;
create table persone (
	id mediumint not null auto_increment primary key,
	prenom varchar(255) not null,
	nom varchar(255) not null,
	login varchar(255) not null,
	mdp text not null,
	age tinyint not null,
	addr text not null,
	cp mediumint not null,
	ville varchar(255) not null,	
	profil_id mediumint,
	foreign key (profil_id) references profil(id)
);

drop table if exists ttmatch;
create table ttmatch (
	id mediumint not null auto_increment primary key,	
	date_debut timestamp default current_timestamp,
	person_id_1 medium int not null,
	person_id_2 medium int not null,
	foreign key (person_id_1) references personne(id),
	foreign key (person_id_2) references personne(id)
);

drop table if exists msg;
create table msg (
	id mediumint not null auto_increment primary key,
	txt longtext not null,
	date_post timestamp default current_timestamp,
	ttmatch_id medium int not null,
	foreign key (ttmatch_id) references ttmatch(id)
);
