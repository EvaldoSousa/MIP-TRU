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
const f = require('./public/js/functions');
const permission = require('./permissions');
const { ExportToCsv } = require('export-to-csv');
const fs = require('fs');

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

app.get("/search", checkNotAuthenticated, (req, res) => {
    pool.query(f.buscarSelect('municipio_emissor'), (erro, results) => {
        if (erro) {
            throw erro;
        }
        let municipio_emissor = results.rows;
        pool.query(f.buscarSelect('uf_emissor'), (erro, results) => {
            if (erro) {
                throw erro;
            }
            let uf_emissor = results.rows;
            pool.query(f.buscarSelect('municipio_destinatario'), (erro, results) => {
                if (erro) {
                    throw erro;
                }
                let municipio_destinatario = results.rows;
                pool.query(f.buscarSelect('uf_destinatario'), (erro, results) => {
                    if (erro) {
                        throw erro;
                    }
                    let uf_destinatario = results.rows;
                    pool.query(f.buscarSelect('cfop'), (erro, results) => {
                        if (erro) {
                            throw erro;
                        }
                        let cfop = results.rows;
                        pool.query(f.buscarSelect('cfop_1d'), (erro, results) => {
                            if (erro) {
                                throw erro;
                            }
                            let cfop_1d = results.rows;
                            pool.query(f.buscarSelect('cfop_2d'), (erro, results) => {
                                if (erro) {
                                    throw erro;
                                }
                                let cfop_2d = results.rows;
                                pool.query(f.buscarSelect('cfop_3d'), (erro, results) => {
                                    if (erro) {
                                        throw erro;
                                    }
                                    let cfop_3d = results.rows;
                                    pool.query(f.buscarSelect('cnae'), (erro, results) => {
                                        if (erro) {
                                            throw erro;
                                        }
                                        let cnae = results.rows;
                                        pool.query(f.buscarSelect('cnae_divisao'), (erro, results) => {
                                            if (erro) {
                                                throw erro;
                                            }
                                            let cnae_divisao = results.rows;
                                            pool.query(f.buscarSelect('cnae_grupo'), (erro, results) => {
                                                if (erro) {
                                                    throw erro;
                                                }
                                                let cnae_grupo = results.rows;
                                                pool.query(f.buscarSelect('cnae_classe_4d'), (erro, results) => {
                                                    if (erro) {
                                                        throw erro;
                                                    }
                                                    let cnae_classe_4d = results.rows;
                                                    pool.query(f.buscarSelect('cnae_classe_5d'), (erro, results) => {
                                                        if (erro) {
                                                            throw erro;
                                                        }
                                                        let cnae_classe_5d = results.rows;
                                                        pool.query(f.buscarSelect('scr_2010_trabalho'), (erro, results) => {
                                                            if (erro) {
                                                                throw erro;
                                                            }
                                                            let scr_2010_trabalho = results.rows;
                                                            pool.query(f.buscarSelect('scr_2010_divulga'), (erro, results) => {
                                                                if (erro) {
                                                                    throw erro;
                                                                }
                                                                let scr_2010_divulga = results.rows;
                                                                pool.query(f.buscarSelect('ncm_produto'), (erro, results) => {
                                                                    if (erro) {
                                                                        throw erro;
                                                                    }
                                                                    let ncm_produto = results.rows;
                                                                    res.render("search",
                                                                        {
                                                                            municipio_emissor, uf_emissor, municipio_destinatario, uf_destinatario,
                                                                            cfop, cfop_1d, cfop_2d, cfop_3d, cnae, cnae_divisao, cnae_grupo,
                                                                            cnae_classe_4d, cnae_classe_5d, scr_2010_trabalho, scr_2010_divulga, ncm_produto
                                                                        });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

// rota para página de cadastro
app.get("/cadastro", checkNotAuthenticated, (req, res) => {
    res.render("cadastro");
});

// rota para página de edição de perfil
app.get('/editar', checkNotAuthenticated, (req, res) => {
    res.render("editarPerfil", { nome: req.user.nome, sobrenome: req.user.sobrenome, nick: req.user.nomeusuario, email: req.user.email, senha: req.user.senha, telefone: f.reverseFormat(req.user.telefone) });
});

// rota para finalizar sessão
app.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', "Você se desconectou");
    res.redirect('/login');
});

app.post('/search', (req, res) => {
    let {
        municipio_emissor, uf_emissor, municipio_destinatario, uf_destinatario,
        cfop, cfop_1d, cfop_2d, cfop_3d, cnae, cnae_divisao, cnae_grupo,
        cnae_classe_4d, cnae_classe_5d, scr_2010_trabalho, scr_2010_divulga, ncm_produto
    } = req.body;
    let errors = [];

    console.log("Município: " + municipio_emissor);
    
    if (!municipio_emissor && !uf_emissor && !municipio_destinatario && !uf_destinatario && !cfop && !cfop_1d && !cfop_2d && !cfop_3d && !cnae && !cnae_divisao && !cnae_grupo && !cnae_classe_4d && !cnae_classe_5d && !scr_2010_trabalho && !scr_2010_divulga && !ncm_produto) {
        errors.push({ message: "Preencha ao menos um dos campos" });
    }

    if (errors.length > 0) {
        req.flash("error", errors[0].message);
        res.redirect('/search');
        return
    }

    let sql = f.buscar(municipio_emissor, uf_emissor, municipio_destinatario, uf_destinatario,
        cfop, cfop_1d, cfop_2d, cfop_3d, cnae, cnae_divisao, cnae_grupo,
        cnae_classe_4d, cnae_classe_5d, scr_2010_trabalho, scr_2010_divulga, ncm_produto);
    pool.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        let dados = results.rows;
        if (dados == null || dados.length < 1) {
            req.flash("error", "Nenhum dado encontrado!");
            res.redirect('/search');
            return
        }

        const options = {
            fieldSeparator: ',',
            filename: 'tabela',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: false,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: false,
            headers: ['Município Emissor', 'UF Emissor', 'Município Destinatário', 'UF Destinatário',
                'CFOP', 'Descrição CFOP', 'CFOP (1D)', 'CFOP (2D)', 'CFOP (3D)', 'CNAE (C)',
                'Descrição do CNAE', 'CNAE (Divisão)', 'CNAE (Divisão) Desc', 'CNAE (Grupo)',
                'CNAE (Grupo) Desc', 'CNAE (Classe - 4D)', 'CNAE (Classe - 4D) Desc',
                'CNAE (Classe - 5D)', 'CNAE (Classe - 5D) Desc', 'SCR 2010 Trabalho',
                'SCR 2010 Trabalho Desc', 'SCR 2010 Divulga', 'SCR 2010 Divulga Desc',
                'NCM Produto', 'Total Bruto Produtos']
        };

        const csvExporter = new ExportToCsv(options);

        const csvData = csvExporter.generateCsv(dados, true);
        fs.writeFileSync('tabela.csv', csvData);
        res.download('tabela.csv');
        return;
    });
})

app.post("/updatename", async (req, res) => {
    let { nome, sobrenome } = req.body;
    let errors = [];
    if (!nome || !sobrenome) {
        errors.push({ message: "Preencha todos os campos" });
    }
    if (errors.length > 0) {
        req.flash("error", errors[0].message);
        res.redirect('/editar');
        return
    }

    pool.query(
        `UPDATE usuarios
        SET nome = $1, sobrenome = $2
        WHERE email = $3`, [nome, sobrenome, req.user.email], (err, results) => {
        if (err) {
            throw err;
        }

        req.flash("success_msg", "Seu nome e sobrenome foram alterados com sucesso!");
        res.redirect('/editar');
    }
    );
});

app.post("/updatephone", async (req, res) => {
    let { telefone } = req.body;
    let errors = [];
    if (!telefone) {
        errors.push({ message: "Insira o número de telefone" });
    }
    if (errors.length > 0) {
        req.flash("error", errors[0].message);
        res.redirect('/editar');
        return
    }

    pool.query(
        `UPDATE usuarios
        SET telefone = $1
        WHERE email = $2`, [f.formatarTelefone(telefone), req.user.email], (err, results) => {
        if (err) {
            throw err;
        }

        req.flash("success_msg", "Seu telefone foi alterado com sucesso!");
        res.redirect('/editar');
    }
    );
});

app.post("/updatenick", async (req, res) => {
    let { nick } = req.body;
    nick = f.removeAcento(nick.toLowerCase().trim());
    let errors = [];
    if (!nick) {
        errors.push({ message: "Insira o novo nome de usuário!" });
    } else if (nick == req.user.nomeusuario) {
        errors.push({ message: "Insira um nome de usuário diferente!" });
    }
    if (errors.length > 0) {
        req.flash("error", errors[0].message);
        res.redirect('/editar');
        return
    }

    pool.query(
        `SELECT * FROM usuarios
        WHERE nomeusuario = $1`, [nick], (err, results) => {
        if (results.rows.length > 0) {
            errors.push({ message: "Nome de usuário já cadastrado!" });
            req.flash("error", errors[0].message);
            res.redirect('/editar');
        } else {
            console.log("sai");
            pool.query(
                `UPDATE usuarios
                    SET nomeusuario = $1
                    WHERE email = $2`, [nick, req.user.email], (erro, resultados) => {
                req.flash("success_msg", "Seu nome de usuário foi alterado!");
                res.redirect('/editar');
            }
            );
        }
    }
    );
});

app.post("/updateemail", async (req, res) => {
    let { email } = req.body;
    email = email.toLowerCase().trim();
    let errors = [];
    if (!email) {
        errors.push({ message: "Insira o novo e-mail!" });
    } else if (email == req.user.email) {
        errors.push({ message: "Insira um e-mail diferente!" });
    }

    if (errors.length > 0) {
        req.flash("error", errors[0].message);
        res.redirect('/editar');
        return
    }

    pool.query(
        `SELECT * FROM usuarios
        WHERE email = $1`, [email], (err, results) => {
        if (results.rows.length > 0) {
            errors.push({ message: "E-mail já cadastrado!" });
            req.flash("error", errors[0].message);
            res.redirect('/editar');
        } else {
            pool.query(
                `UPDATE usuarios
                    SET email = $1
                    WHERE nomeusuario = $2`, [email, req.user.nomeusuario], (erro, resultados) => {
                req.flash("success_msg", "Seu e-mail foi alterado!");
                res.redirect('/editar');
            }
            );
        }
    }
    );
});

app.post("/updatepassword", async (req, res) => {
    let { senha, senha2 } = req.body;
    let errors = [];
    if (!senha, !senha2) {
        errors.push({ message: "Preencha todos os campos" });
    } else if (senha != senha2) {
        errors.push({ message: "As senhas não são iguais" });
    } else {
        var hashedPassword = await bcrypt.hash(senha, 10);
    }
    if (errors.length > 0) {
        req.flash("error", errors[0].message);
        res.redirect('/editar');
        return
    }

    pool.query(
        `UPDATE usuarios
        SET senha = $1
        WHERE email = $2`, [hashedPassword, req.user.email], (err, results) => {
        if (err) {
            throw err;
        }

        req.flash("success_msg", "Sua senha foi alterada com sucesso!");
        res.redirect('/editar');
    }
    );
});

app.post("/forgot", async (req, res) => {
    let { email } = req.body;
    email = email.toLowerCase().trim();
    let errors = [];
    if (!email) {
        errors.push({ message: "Preencha o campo de e-mail" });
    }
    if (errors.length > 0) {
        res.render('forgot', { errors });
        return
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

    email = email.toLowerCase().trim();
    usuario = f.removeAcento(usuario.toLowerCase().trim());

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
        return
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
                                RETURNING id, senha`, [nome, sobrenome, email, usuario, f.formatarTelefone(telefone), perfil, hashedPassword],
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