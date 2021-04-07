CREATE TABLE entrada2018 (id SERIAL PRIMARY KEY, 
						  ano_emissao INT NOT NULL, 
						  entrada_saida VARCHAR(20) NOT NULL,
						  municipio_destinatraio VARCHAR(50) NOT NULL,
						  cnae_c INT NOT NULL,
						  descricao_cnae VARCHAR(300) NOT NULL,
						  cnae_divisao VARCHAR(300) NOT NULL,
						  cnae_grupo VARCHAR(300) NOT NULL,
						  cnae_classe VARCHAR(300) NOT NULL,
						  ncm_produto VARCHAR(300) NOT NULL,
						  ncm_capitulo VARCHAR(300) NOT NULL,
						  ncm_posicao VARCHAR(300) NOT NULL,
						  ncm_subposicao VARCHAR(300) NOT NULL,
						  cfpo INT NOT NULL,
						  descricao_cfpo VARCHAR(300) NOT NULL,
						  cfpo_1 VARCHAR(300) NOT NULL,
						  cfpo_2 VARCHAR(300) NOT NULL,
						  total_bruto_produtos VARCHAR(300) NOT NULL,
						  ncm_capitulo_desc VARCHAR(300) NOT NULL,
						  ncm_posicao_desc VARCHAR(300) NOT NULL,
						  ncm_subposicao_desc VARCHAR(300) NOT NULL);
						  
						  
						  
						  
						  
						  
						  