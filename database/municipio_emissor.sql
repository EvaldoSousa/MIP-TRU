create table municipio_emissor (
    id serial primary key not null,
    municipio_emissor varchar(100) not null
);

create table municipio_emissor_codigo (
    id serial primary key not null,
    municipio_emissor_codigo varchar(100) not null
);

create table municipio_destinatario (
    id serial primary key not null,
    municipio_destinatario varchar(100) not null
);

create table municipio_destinatario_codigo (
    id serial primary key not null,
    municipio_destinatario_codigo varchar(100) not null
);

create table uf_emissor (
    id serial primary key not null,
    uf_emissor VARCHAR(5) NOT NULL
);

create table uf_destinatario (
    id serial primary key not null,
    uf_destinatario VARCHAR(5) NOT NULL
);

create table cfop (
    id serial primary key not null,
    cfop VARCHAR(100) NOT NULL
);

create table cfop_1d (
    id serial primary key not null,
    cfop_1d VARCHAR(10) NOT NULL
);

create table cfop_2d (
    id serial primary key not null,
    cfop_2d VARCHAR(10) NOT NULL
);

create table cfop_3d (
    id serial primary key not null,
    cfop_3d VARCHAR(10) NOT NULL
);

create table cnae (
    id serial primary key not null,
    cnae VARCHAR(50) NOT NULL
);

create table cnae_divisao (
    id serial primary key not null,
    cnae_divisao VARCHAR(10) NOT NULL
);

create table cnae_grupo (
    id serial primary key not null,
    cnae_grupo VARCHAR(10) NOT NULL
);

create table cnae_classe_4d (
    id serial primary key not null,
    cnae_classe_4d VARCHAR(10) NOT NULL
);

create table cnae_classe_5d (
    id serial primary key not null,
    cnae_classe_5d VARCHAR(10) NOT NULL
);

create table scr_2010_trabalho (
    id serial primary key not null,
    scr_2010_trabalho VARCHAR(10)
);

create table scr_2010_divulga (
    id serial primary key not null,
    scr_2010_divulga VARCHAR(10)
);

create table ncm_produto (
    id serial primary key not null,
    ncm_produto VARCHAR(20) NOT NULL
);

