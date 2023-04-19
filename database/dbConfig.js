// procura o arquivo .env no projeto para usar as informações de lá
require("dotenv").config();

const { Pool } = require('pg');

// verifica se o projeto está em produção
const isProduction = process.env.NODE_ENV === 'production';

// cria a conexão com o .env e o DB usando os parâmetros do arquivo
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// invoca a conexão criada
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});

module.exports = { pool };