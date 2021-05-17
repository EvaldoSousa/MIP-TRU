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
const phone_format = require('./public/js/functions');
const permission = require('./permissions');

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

// Inicializa o Passport
const initializePassport = require('./database/passportConfig');
initializePassport(passport);

// Escolhe a porta da conexão
const PORT = process.env.PORT || 3001;

// rota para arquivos estáticos (img, css, js)
app.use(express.static("public"));

// middleware pra trabalhar com arquivos ejs
app.set('view engine', 'ejs');

//envia informações do front para o server
app.use(express.urlencoded({ extended: false }))

// usa o session para criar um "segredo" pra conexão
app.use(session({
    secret: 'secret',

    resave: false,

    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

// rota para página inicial
app.get("/", checkNotAuthenticated, (req, res) => {
    res.render('index', { user: req.user.nome, profile: req.user.perfil });
});

// rota para tabela
app.get("/table", checkNotAuthenticated, (req, res) => {
    res.render("table");
});

// rota para página de cadastro
app.get("/cadastro", checkNotAuthenticated, (req, res) => {
    res.render("cadastro");
});

// rota para página de edição de perfil
app.get('/editar', checkNotAuthenticated, (req, res) => {
    res.render("editarPerfil", { nome: req.user.nome, sobrenome: req.user.sobrenome, nick: req.user.nomeusuario, senha: req.user.senha, telefone: phone_format.reverseFormat(req.user.telefone) });
});

// rota para finalizar sessão
app.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', "Você se desconectou");
    res.redirect('/login');
});

app.post("/forgot", async (req, res) => {
    let { email } = req.body;
    let errors = [];
    if (!email) {
        errors.push({ message: "Preencha o campo de e-mail" });
    }
    if (errors.length > 0) {
        res.render('forgot', { errors });
    } else {
        //Formulário foi validado
        var senha = require('./public/js/util').gerarSenha();
        var hashedPassword = await bcrypt.hash(senha, 10);
        console.log(senha);
    }

    pool.query(
        `SELECT * FROM usuarios
        WHERE email = $1`, [email], (err, results) => {
        // verifica se há algum usuario no banco de dados com o e-mail cadastrado
        if (results.rows.length < 1) {
            errors.push({ message: "E-mail não encontrado" });
            res.render('forgot', { errors });
        } else {
            pool.query(
                `UPDATE usuarios
                SET senha = $1
                WHERE email = $2`, [hashedPassword, results.rows[0].email], (erro, dados) => {
                if (err) {
                    throw err
                }

                require('./public/js/mail')(results.rows[0].email, "Sua nova senha do MIP/TRU", "Olá, " + results.rows[0].nome + ", sua nova senha é " + senha);
                req.flash("success_msg", "Sua nova senha foi enviada pro seu e-mail. Por favor, faça login.");
                res.redirect('/login');
            }
            );
        }
    }
    );
});

// rota para cadastrar usuários
app.post("/cadastro", async (req, res) => {
    let { nome, sobrenome, email, usuario, telefone, perfil, senha, senha2 } = req.body;

    // cria um vetor de erros
    let errors = [];

    // após verificações, adiciona erros no vetor
    if (!nome || !sobrenome || !email || !usuario || !telefone || !senha || !senha2) {
        errors.push({ message: "Por favor preencha todos os campos" });
    }
    if (senha.length < 6) {
        errors.push({ message: "Senha deve ter no mínimo 6 caracteres" });
    }
    if (senha != senha2) {
        errors.push({ message: "As senhas não estão iguais" });
    }

    // caso haja erros, renderiza a página cadastro com os erros
    if (errors.length > 0) {
        res.render('cadastro', { errors });
    } else {
        //Formulário foi validado
        var hashedPassword = await bcrypt.hash(senha, 10);
    }

    pool.query(
        `SELECT * FROM usuarios
        WHERE email = $1`, [email], (err, results) => {

        // verifica se há algum usuario no banco de dados com o e-mail cadastrado
        if (results.rows.length > 0) {
            errors.push({ message: "E-mail já cadastrado" });
            res.render('cadastro', { errors });
        } else {
            pool.query(
                `SELECT * FROM usuarios
                    WHERE nomeusuario = $1`, [usuario], (err, results) => {
                if (err) {
                    throw err;
                }
                // verifica se há algum usuario no banco de dados com o nome de usuário cadastrado
                if (results.rows.length > 0) {
                    errors.push({ message: "Nome de Usuário já cadastrado" });
                    res.render('cadastro', { errors });
                } else {
                    pool.query(
                        `INSERT INTO usuarios (nome, sobrenome, email, nomeusuario, telefone, perfil, senha)
                                VALUES ($1, $2, $3, $4, $5, $6, $7)
                                RETURNING id, senha`, [nome, sobrenome, email, usuario, phone_format.formatarTelefone(telefone), perfil, hashedPassword],
                        (err, results) => {
                            if (err) {
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

// rota para página de login
app.get("/login", checkAuthenticated, (req, res) => {
    res.render("login");
});

app.get("/forgot", checkAuthenticated, (req, res) => {
    res.render("forgot");
});


// rota para página de erro 404
// app.use(function(req, res, next){
//     res.status(404).render("error404");
// });

// rota para autenticação de login
app.post('/login', passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

// função de verificação de autenticação
function checkAuthenticated(req, res, next) {
    // se estiver autenticado, redireciona para página inicial
    if (req.isAuthenticated() && permission(req)) {
        return res.redirect('/');
    }
    next();
}

// função de verificação de não-autenticação
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated() && permission(req)) {
        return next();
    }
    // se não estiver autenticado, redireciona para página de login
    res.redirect('/login');
}

// starta o servidor
app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}🦽`);
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

app.get('*', function (req, res) {
    res.status(404).render('error404');
});