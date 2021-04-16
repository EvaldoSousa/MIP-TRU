const express = require('express');
const app = express();
const path = require('path');
const { pool } = require("./database/dbConfig");
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const { Pool, Client } = require("pg");
const cors = require('cors');
app.use(cors());
const db = require('./database');

// parse JSON (application/json content-type)
app.use(express.json());

// END-POINT mostrar entrada
app.get('/entrada', (req, res, next) => {
    db.query("SELECT * FROM entradas ;", [], (err, res2) => {
        if (err) {
            return next(err)
        }
        res.json(res2.rows);
    })
});

const initializePassport = require('./database/passportConfig');

initializePassport(passport);

const PORT = process.env.PORT || 3001;

//rota para arquivos estáticos (img, css, js)
app.use(express.static("public"));

app.set('view engine', 'ejs');

//envia informações do front para o server
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'secret',

    resave: false,

    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

app.get("/", checkNotAuthenticated, (req, res) => {
    res.render('index');
});

app.get("/table", checkNotAuthenticated, (req, res) => {
    res.render("table");
});

app.get("/cadastro", (req, res) => {
    res.render("cadastro");
});

app.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', "Você se desconectou");
    res.redirect('/login');
});


app.get('/editar', (req, res) => {
    res.render("editarPerfil");
});



app.post("/cadastro", async (req, res) => {
    let { nome, email, usuario, telefone, senha, senha2 } = req.body;

    // cria um vetor de erros
    let errors = [];

    // após verificações, adiciona erros no vetor
    if (!nome || !email || !usuario || !telefone || !senha || !senha2) {
        errors.push({message: "Por favor preencha todos os campos"});
    }
    if(senha.length < 6) {
        errors.push({message: "Senha deve ter no mínimo 6 caracteres"});
    }
    if(senha != senha2) {
        errors.push({message: "As senhas não estão iguais"});
    }

    // caso haja erros, renderiza a página cadastro com os erros
    if(errors.length > 0) {
        res.render('cadastro', {errors});
    } else {
        //Formulário foi validado
        var hashedPassword = await bcrypt.hash(senha, 10);
    }

    pool.query(
        `SELECT * FROM usuarios
        WHERE email = $1`, [email], (err, results) => {
            if(err) {
                throw err
            }

            // verifica se há algum usuario no banco de dados com o e-mail cadastrado
            if(results.rows.length > 0) {
                errors.push({message: "E-mail já cadastrado"});
                res.render('cadastro', { errors });
            } else {
                pool.query(
                    `SELECT * FROM usuarios
                    WHERE nomeusuario = $1`, [usuario], (err, results) => {
                        if(err) {
                            throw err;
                        }

                        if(results.rows.length > 0) {
                            errors.push({message: "Nome de Usuário já cadastrado"});
                            res.render('cadastro', { errors });
                        } else {
                            pool.query(
                                `INSERT INTO usuarios (nome, email, nomeusuario, telefone, senha)
                                VALUES ($1, $2, $3, $4, $5)
                                RETURNING id, senha`, [nome, email, usuario, telefone, hashedPassword], 
                                (err, results) => {
                                    if(err) {
                                        throw err
                                    }
            
                                    req.flash("success_msg", "Você agora está registrado. Por favor, faça login");
                                    res.redirect('/login');
                                }
                            );
                        }
                    }
                );
            }
        }
    )
});

app.get("/login", checkAuthenticated, (req, res) => {
    res.render("login");
});

// app.use(function(req, res, next){
//     res.status(404).render("error404");
// });

app.post('/login', passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

app.listen(PORT, () => {
    console.log(`Servidor front-end na porta ${PORT}🦽`);
});

// // END-POINT deleta pessoa
// server.delete("/usuarios", (req, res) => {
//     const item = req.body;
//     deletar(item.id);
//     res.json(item);
// })

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

//==================================================================================================

function mostrarTodos() {
    poolPostgres.connect((err, client, done) => {
        if (err) throw err
        client.query("SELECT * FROM entradas ", [],
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