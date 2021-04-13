const express = require('express');
const server = express();
const { Pool, Client } = require("pg");
const cors = require('cors');
server.use(cors());
const db = require('./modules');

//Conexão database usuarios
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "usuarios",
    password: "root",
    port: "5432"
});

// parse JSON (application/json content-type)
server.use(express.json());

// END-POINT mostrar entrada
server.get('/entrada', (req, res, next) => {
    db.query("SELECT * FROM entrada ;", [], (err, res2) => {
        if (err) {
            return next(err)
        }
        res.json(res2.rows);
    })
});

// END-POINT cadastra pessoa
server.post("/usuarios", (req, res) => {
    const item = req.body;
    console.log(item.nome, "+", item.email, "+", item.usuario, "+", item.telefone, "+", item.senha);
    cadastrar(item.nome, item.email, item.usuario, item.telefone, item.senha)
    // return updated list
    res.json(item);
});

// // END-POINT deleta pessoa
// server.delete("/usuarios", (req, res) => {
//     const item = req.body;
//     deletar(item.id);
//     res.json(item);
// })

// END-POINT mostra pessoa
server.get("/usuarios", (req, res) => {
    const item = req.body;
    res.json(mostrar(item.id));
});

//========================================================================================================//


function cadastrar(nomecompleto, email, nomeusuario, telefone, senha) {
    pool.connect((err, client, done) => {
        if (err) throw err
        client.query("INSERT INTO usuarios (id, nomecompleto, email, nomeusuario, telefone, senha) VALUES (default, $1,$2, $3, $4, $5);", [nomecompleto, email, nomeusuario, telefone, senha],
            (err, res) => {
                done()
                if (err) {
                    console.log(err.stack)
                } else {
                    console.log(res.rows[0])
                }
            })
    })
}

// function deletar(id){
//     pool.connect((err, client, done) => {
//         if (err) throw err
//         client.query("DELETE FROM pessoas WHERE id = $1;", [id],
//             (err, res) => {
//                 done()
//                 if (err) {
//                     console.log(err.stack)
//                 } else {
//                     console.log(res.rows[0])
//                 }
//             })
//     })
// }

// function mostrar(id){
//     pool.connect((err, client, done) => {
//         if (err) throw err
//         client.query("SELECT * FROM usuarios WHERE id = $1", [id],
//             (err, res) => {
//                 done()
//                 if (err) {
//                     console.log(err.stack)
//                 } else {
//                     console.log(res.rows);
//                     return res.rows[0];
//                 }
//             })
//     })
// }

// function mostrarTodos(){
//     pool.connect((err, client, done) => {
//         if (err) throw err
//         client.query("SELECT * FROM pessoas ", [],
//             (err, res) => {
//                 done()
//                 if (err) {
//                     console.log(err.stack)
//                 } else {
//                     console.log(res.rows[0])
//                 }
//             })
//     })
// }

//==================================================================================================

function mostrarTodos() {
    poolPostgres.connect((err, client, done) => {
        if (err) throw err
        client.query("SELECT * FROM entrada ", [],
            (err, res) => {
                done()
                if (err) {
                    console.log(err.stack)
                } else {
                    console.log(res.rows[0])
                }
            })
    })
}














server.listen(3000);