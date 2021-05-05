-- Não rode pq ainda não tá definitivo

CREATE TABLE usuarios
(
	id BIGSERIAL PRIMARY KEY NOT NULL,
	nome VARCHAR(100) NOT NULL,
	sobrenome VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	nomeusuario VARCHAR(50) NOT NULL,
	telefone VARCHAR(12) NOT NULL,
	perfil INTEGER NOT NULL,
	senha VARCHAR(200) NOT NULL,
	UNIQUE (email, nomeusuario)
);