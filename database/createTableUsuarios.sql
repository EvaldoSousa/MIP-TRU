-- Não rode pq ainda não tá definitivo

CREATE TABLE usuarios
(
	nomecompleto VARCHAR(100) NOT NULL,
	email VARCHAR(50) NOT NULL,
	nomeusuario VARCHAR(50) NOT NULL,
	telefone VARCHAR(12) NOT NULL,
	senha VARCHAR(100) NOT NULL,
	PRIMARY KEY(email, nomeusuario)
);