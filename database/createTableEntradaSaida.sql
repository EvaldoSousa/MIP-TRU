CREATE TABLE entradas(id BIGSERIAL PRIMARY KEY NOT NULL, ano VARCHAR(10) NOT NULL,
					  entrada VARCHAR(100) NOT NULL,
					  destinatario VARCHAR(100),
					  cnae VARCHAR(300));