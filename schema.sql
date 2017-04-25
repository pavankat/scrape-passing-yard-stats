CREATE DATABASE fantasy_db;
USE fantasy_db;

CREATE TABLE players
(
	id int NOT NULL AUTO_INCREMENT,
	player varchar(255) NOT NULL,
	team varchar(255) NOT NULL,
	pos varchar(255) NOT NULL,
	comp varchar(255) NOT NULL,
	att varchar(255) NOT NULL,
	yards varchar(255) NOT NULL,
	tds varchar(255) NOT NULL,
	interceptions varchar(255) NOT NULL,
	PRIMARY KEY (id)
);