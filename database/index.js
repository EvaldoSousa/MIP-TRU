const { Pool } = require('pg')
const pool = new Pool({
    user: "mip_adm",
    host: "localhost",
    database: "mip_tru",
    password: "mip_tru",
    port: "5432"
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
      },
};
