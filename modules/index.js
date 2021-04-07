//Integração com tabela de dados
const { Pool } = require('pg')
const pool = new Pool({
    user: "fevaldo",
    host: "localhost",
    database: "postgres",
    password: "123filho",
    port: "5432"
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
      },
};
