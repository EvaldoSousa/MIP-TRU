CREATE TABLE entradas(id BIGSERIAL PRIMARY KEY NOT NULL,
					ano INTEGER NOT NULL,
					municipio_emissor VARCHAR(100) NOT NULL,
					municipio_emissor_codigo VARCHAR(100),
					uf_emissor VARCHAR(2) NOT NULL,
					municipio_destinatario VARCHAR(100) NOT NULL,
					municipio_destinatario_codigo VARCHAR(100),
					uf_destinatario VARCHAR(2) NOT NULL,
					cfop VARCHAR(100) NOT NULL,
					desc_cfop TEXT NOT NULL,
					cfop_1d VARCHAR(100) NOT NULL,
					cfop_2d VARCHAR(100) NOT NULL,
					cfop_3d VARCHAR(100) NOT NULL,
					ncm_produto VARCHAR(100) NOT NULL,
					cnae VARCHAR(100) NOT NULL,
					desc_cnae TEXT NOT NULL,
					cnae_divisao VARCHAR(100) NOT NULL,
					cnae_divisao_desc TEXT NOT NULL,
					cnae_grupo VARCHAR(100) NOT NULL,
					cnae_grupo_desc TEXT NOT NULL,
					cnae_classe_4d VARCHAR(100) NOT NULL,
					cnae_classe_4d_desc TEXT NOT NULL,
					cnae_classe_5d VARCHAR(100) NOT NULL,
					cnae_classe_5d_desc TEXT NOT NULL,
					scr_2010_trabalho VARCHAR(100),
					scr_2010_trabalho_desc TEXT,
					scr_2010_divulga VARCHAR(100),
					scr_2010_divulga_desc TEXT,
					total_bruto_produtos DECIMAL NOT NULL);
