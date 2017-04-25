CREATE DATABASE fantasy_db;
USE fantasy_db;

CREATE TABLE quarterbacks
(
	id int NOT NULL AUTO_INCREMENT,
	player varchar(255),
	team varchar(255),
	pos varchar(255),
	comp varchar(255),
	att varchar(255),
	yards varchar(255),
	tds varchar(255),
	interceptions varchar(255),
	PRIMARY KEY (id)
);