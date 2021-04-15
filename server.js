const express = require('express');
const app = express();
const path = require('path');
const { pool } = require("./database/dbConfig");
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const initializePassport = require('./modules/passportConfig');

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
    console.log({
        nome,
        email,
        usuario,
        telefone,
        senha,
        senha2
    });

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
        console.log(hashedPassword);
    }

    pool.query(
        `SELECT * FROM usuarios
        WHERE email = $1`, [email], (err, results) => {
            if(err) {
                throw err
            }

            console.log(results.rows);
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

                        console.log(results.rows);
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
            
                                    console.log(results.rows);
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