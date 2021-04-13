//Integração com tabela de dados
const { Pool } = require('pg')
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "root",
    port: "5432"
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
      },
};
