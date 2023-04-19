const { Pool } = require('pg')

// const pool = new Pool({
//     user: "mip_tru",
//     host: "lcc-db.unifesspa.edu.br",
//     database: "mip_tru",
//     password: "cZ^QSCwhA1O@W",
//     port: "5432"
// });


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
