<<<<<<< HEAD
CREATE TABLE entradas
(
	id BIGSERIAL PRIMARY KEY NOT NULL,
	ano VARCHAR(50) NOT NULL,
	entrada VARCHAR(100) NOT NULL,
	destinatario VARCHAR(100),
	cnae VARCHAR(300)
);
=======
CREATE TABLE entradas(id BIGSERIAL PRIMARY KEY NOT NULL, 
					municipio_emissor VARCHAR(100) NOT NULL,
					uf_emissor VARCHAR(2) NOT NULL,
					municipio_destinatario VARCHAR(100) NOT NULL,
					uf_destinatario VARCHAR(2) NOT NULL,
					cfop INTEGER NOT NULL,
					desc_cfop TEXT NOT NULL,
					cfop_1d INTEGER NOT NULL,
					cfop_2d INTEGER NOT NULL,
					cfop_3d INTEGER NOT NULL,
					cnae BIGINT NOT NULL,
					desc_cnae TEXT NOT NULL,
					cnae_divisao INTEGER NOT NULL,
					cnae_divisao_desc TEXT NOT NULL,
					cnae_grupo INTEGER NOT NULL,
					cnae_grupo_desc TEXT NOT NULL,
					cnae_classe_4d INTEGER NOT NULL,
					cnae_classe_4d_desc TEXT NOT NULL,
					cnae_classe_5d INTEGER NOT NULL,
					cnae_classe_5d_desc TEXT NOT NULL,
					scr_2010_trabalho BIGINT NOT NULL,
					scr_2010_trabalho_desc TEXT NOT NULL,
					scr_2010_divulga INTEGER NOT NULL,
					scr_2010_divulga_desc TEXT NOT NULL,
					ncm_produto BIGINT NOT NULL,
					total_bruto_produtos DECIMAL(12,2) NOT NULL);
>>>>>>> 6f721ed3db406cbef3b09e1eed9bc26e86f8340e
