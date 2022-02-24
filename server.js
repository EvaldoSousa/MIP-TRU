const express = require("express");
const app = express();
const path = require("path");
const { pool } = require("./database/dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const { Pool, Client } = require("pg");
const cors = require("cors");
app.use(cors());
const db = require("./database");
const f = require("./public/js/functions");
const permission = require("./permissions");
const { ExportToCsv } = require("export-to-csv");
const fs = require("fs");

// parse JSON (application/json content-type)
app.use(express.json());

// // END-POINT mostrar entrada
// app.get("/entrada", checkAuthenticated,  (req, res, next) => {
//   db.query("SELECT * FROM entradas;", [], (err, res2) => {
//     if (err) {
//       return next(err);
//     }
//     res.json(res2.rows);
//   });
// });

// Inicializa o Passport
const initializePassport = require("./database/passportConfig");
initializePassport(passport);

// Escolhe a porta da conexão
const PORT = process.env.PORT || 3001;

// rota para arquivos estáticos (img, css, js)
app.use(express.static("public"));

// middleware pra trabalhar com arquivos ejs
app.set("view engine", "ejs");

//envia informações do front para o server
app.use(express.urlencoded({ extended: true }));

// usa o session para criar um "segredo" pra conexão
app.use(
  session({
    secret: "secret",

    resave: false,

    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// rota para página de créditos
app.get("/sobre", checkNotAuthenticated, (req, res) => {
  res.render("sobre", { profile: req.user.perfil });
});

// rota para página inicial
app.get("/", checkNotAuthenticated, (req, res) => {
  pool.query(
    "select distinct ano from ano order by ano asc",
    (erro, resultados) => {
      if (erro) {
        throw erro;
      }
      ano = resultados.rows;
      pool.query(
        "select distinct municipio_emissor_codigo from municipio_emissor_codigo order by 1 asc",
        (erro, resultados) => {
          if (erro) {
            throw erro;
          }
          municipio_emissor_codigo = resultados.rows;
          pool.query(
            "select distinct municipio_emissor from municipio_emissor order by 1 asc",
            (erro, resultados) => {
              if (erro) {
                throw erro;
              }
              municipio_emissor = resultados.rows;
              pool.query(
                "select distinct uf_emissor from uf_emissor order by 1 asc",
                (erro, resultados) => {
                  if (erro) {
                    throw erro;
                  }
                  uf_emissor = resultados.rows;
                  pool.query(
                    "select distinct municipio_destinatario_codigo from municipio_destinatario_codigo order by 1 asc",
                    (erro, resultados) => {
                      if (erro) {
                        throw erro;
                      }
                      municipio_destinatario_codigo = resultados.rows;
                      pool.query(
                        "select distinct municipio_destinatario from municipio_destinatario order by 1 asc",
                        (erro, resultados) => {
                          if (erro) {
                            throw erro;
                          }
                          municipio_destinatario = resultados.rows;
                          pool.query(
                            "select distinct uf_destinatario from uf_destinatario order by 1 asc",
                            (erro, resultados) => {
                              if (erro) {
                                throw erro;
                              }
                              uf_destinatario = resultados.rows;
                              pool.query(
                                "select distinct cfop from cfop order by 1 asc",
                                (erro, resultados) => {
                                  if (erro) {
                                    throw erro;
                                  }
                                  cfop = resultados.rows;
                                  pool.query(
                                    "select distinct cfop_1d from cfop_1d order by 1 asc",
                                    (erro, resultados) => {
                                      if (erro) {
                                        throw erro;
                                      }
                                      cfop_1d = resultados.rows;
                                      pool.query(
                                        "select distinct cfop_2d from cfop_2d order by 1 asc",
                                        (erro, resultados) => {
                                          if (erro) {
                                            throw erro;
                                          }
                                          cfop_2d = resultados.rows;
                                          pool.query(
                                            "select distinct cfop_3d from cfop_3d order by 1 asc",
                                            (erro, resultados) => {
                                              if (erro) {
                                                throw erro;
                                              }
                                              cfop_3d = resultados.rows;
                                              pool.query(
                                                "select distinct cnae from cnae order by 1 asc",
                                                (erro, resultados) => {
                                                  if (erro) {
                                                    throw erro;
                                                  }
                                                  cnae = resultados.rows;
                                                  pool.query(
                                                    "select distinct cnae_divisao from cnae_divisao order by 1 asc",
                                                    (erro, resultados) => {
                                                      if (erro) {
                                                        throw erro;
                                                      }
                                                      cnae_divisao =
                                                        resultados.rows;
                                                      pool.query(
                                                        "select distinct cnae_grupo from cnae_grupo order by 1 asc",
                                                        (erro, resultados) => {
                                                          if (erro) {
                                                            throw erro;
                                                          }
                                                          cnae_grupo =
                                                            resultados.rows;
                                                          pool.query(
                                                            "select distinct cnae_classe_4d from cnae_classe_4d order by 1 asc",
                                                            (
                                                              erro,
                                                              resultados
                                                            ) => {
                                                              if (erro) {
                                                                throw erro;
                                                              }
                                                              cnae_classe_4d =
                                                                resultados.rows;
                                                              pool.query(
                                                                "select distinct cnae_classe_5d from cnae_classe_5d order by 1 asc",
                                                                (
                                                                  erro,
                                                                  resultados
                                                                ) => {
                                                                  if (erro) {
                                                                    throw erro;
                                                                  }
                                                                  cnae_classe_5d =
                                                                    resultados.rows;
                                                                  pool.query(
                                                                    "select distinct scr_2010_trabalho from scr_2010_trabalho order by 1 asc",
                                                                    (
                                                                      erro,
                                                                      resultados
                                                                    ) => {
                                                                      if (
                                                                        erro
                                                                      ) {
                                                                        throw erro;
                                                                      }
                                                                      scr_2010_trabalho =
                                                                        resultados.rows;
                                                                      pool.query(
                                                                        "select distinct scr_2010_divulga from scr_2010_divulga order by 1 asc",
                                                                        (
                                                                          erro,
                                                                          resultados
                                                                        ) => {
                                                                          if (
                                                                            erro
                                                                          ) {
                                                                            throw erro;
                                                                          }
                                                                          scr_2010_divulga =
                                                                            resultados.rows;
                                                                          pool.query(
                                                                            "select distinct ncm_produto from ncm_produto order by 1 asc",
                                                                            (
                                                                              erro,
                                                                              resultados
                                                                            ) => {
                                                                              if (
                                                                                erro
                                                                              ) {
                                                                                throw erro;
                                                                              }
                                                                              ncm_produto =
                                                                                resultados.rows;
                                                                              res.render(
                                                                                "index",
                                                                                {
                                                                                  user: req
                                                                                    .user
                                                                                    .nome,
                                                                                  profile:
                                                                                    req
                                                                                      .user
                                                                                      .perfil,
                                                                                  ano,
                                                                                  municipio_emissor_codigo,
                                                                                  municipio_emissor,
                                                                                  uf_emissor,
                                                                                  municipio_destinatario_codigo,
                                                                                  municipio_destinatario,
                                                                                  uf_destinatario,
                                                                                  cfop,
                                                                                  cfop_1d,
                                                                                  cfop_2d,
                                                                                  cfop_3d,
                                                                                  cnae,
                                                                                  cnae_divisao,
                                                                                  cnae_grupo,
                                                                                  cnae_classe_4d,
                                                                                  cnae_classe_5d,
                                                                                  scr_2010_trabalho,
                                                                                  scr_2010_divulga,
                                                                                  ncm_produto,
                                                                                }
                                                                              );
                                                                            }
                                                                          );
                                                                        }
                                                                      );
                                                                    }
                                                                  );
                                                                }
                                                              );
                                                            }
                                                          );
                                                        }
                                                      );
                                                    }
                                                  );
                                                }
                                              );
                                            }
                                          );
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

// rota para página de cadastro
app.get("/cadastro", checkNotAuthenticated, (req, res) => {
  res.render("cadastro", 
  {
    user: req
      .user
      .nome,
    profile:
      req
        .user
        .perfil,
    });
});

// rota para página de edição de perfil
app.get("/editar", checkNotAuthenticated, (req, res) => {
  res.render("editarPerfil", {
    nome: req.user.nome,
    sobrenome: req.user.sobrenome,
    nick: req.user.nomeusuario,
    email: req.user.email,
    senha: req.user.senha,
    telefone: f.reverseFormat(req.user.telefone),
    profile: req.user.perfil,
  });
});

// rota para finalizar sessão
app.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "Você se desconectou");
  res.redirect("/login");
});

app.post("/", (req, res) => {
  let {
    ano,
    municipio_emissor_codigo,
    municipio_emissor,
    uf_emissor,
    municipio_destinatario_codigo,
    municipio_destinatario,
    uf_destinatario,
    cfop,
    cfop_1d,
    cfop_2d,
    cfop_3d,
    ncm_produto,
    cnae,
    cnae_divisao,
    cnae_grupo,
    cnae_classe_4d,
    cnae_classe_5d,
    scr_2010_trabalho,
    scr_2010_divulga,
    agrupar,
    personalizar,
  } = req.body;

  f.aspas(ano, ano);
  f.aspas(municipio_emissor_codigo, municipio_emissor_codigo);
  f.aspas(municipio_emissor, municipio_emissor);
  f.aspas(uf_emissor, uf_emissor);
  f.aspas(municipio_destinatario_codigo, municipio_destinatario_codigo);
  f.aspas(municipio_destinatario, municipio_destinatario);
  f.aspas(uf_destinatario, uf_destinatario);
  f.aspas(cfop, cfop);
  f.aspas(cfop_1d, cfop_1d);
  f.aspas(cfop_2d, cfop_2d);
  f.aspas(cfop_3d, cfop_3d);
  f.aspas(ncm_produto, ncm_produto);
  f.aspas(cnae, cnae);
  f.aspas(cnae_divisao, cnae_divisao);
  f.aspas(cnae_grupo, cnae_grupo);
  f.aspas(cnae_classe_4d, cnae_classe_4d);
  f.aspas(cnae_classe_5d, cnae_classe_5d);
  f.aspas(scr_2010_trabalho, scr_2010_trabalho);
  f.aspas(scr_2010_divulga, scr_2010_divulga);
  
  let errors = [];

  let sql = f.buscar(
    ano,
    municipio_emissor_codigo,
    municipio_emissor,
    uf_emissor,
    municipio_destinatario_codigo,
    municipio_destinatario,
    uf_destinatario,
    cfop,
    cfop_1d,
    cfop_2d,
    cfop_3d,
    ncm_produto,
    cnae,
    cnae_divisao,
    cnae_grupo,
    cnae_classe_4d,
    cnae_classe_5d,
    scr_2010_trabalho,
    scr_2010_divulga,
    agrupar,
    personalizar
  );

  console.log(sql);

  pool.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    let dados = results.rows;
    if (dados == null || dados.length < 1) {
      req.flash("error", "Nenhum dado encontrado!");
      res.redirect("/");
      return;
    }

    const options = {
      fieldSeparator: ";",
      filename: "tabela",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: false,
      headers: [
        personalizar,
      ],
    };

    //se não for feita nenhuma escolha de variáveis, a variável "personalizar" retornará indefinidae fará um select de todas as colunas
    if(typeof personalizar === "undefined"){
      options.headers = [
        "Ano",
        "Código Município Emissor",
        "Município Emissor",
        "UF Emissor",
        "Código Município Destinatário",
        "Município Destinatário",
        "UF Destinatário",
        "CFOP",
        "Descrição CFOP",
        "CFOP (1D)",
        "CFOP (2D)",
        "CFOP (3D)",
        "NCM Produto",
        "CNAE (C)",
        "Descrição do CNAE",
        "CNAE (Divisão)",
        "CNAE (Divisão) Desc",
        "CNAE (Grupo)",
        "CNAE (Grupo) Desc",
        "CNAE (Classe - 4D)",
        "CNAE (Classe - 4D) Desc",
        "CNAE (Classe - 5D)",
        "CNAE (Classe - 5D) Desc",
        "SCR 2010 Trabalho",
        "SCR 2010 Trabalho Desc",
        "SCR 2010 Divulga",
        "SCR 2010 Divulga Desc",
        "Total Bruto Produtos",
      ];
    }

    if (agrupar == "cnae") {
      options.headers = [
        "CNAE (C)",
        "Descrição do CNAE",
        "CNAE (Divisão)",
        "CNAE (Divisão) Desc",
        "CNAE (Grupo)",
        "CNAE (Grupo) Desc",
        "CNAE (Classe - 4D)",
        "CNAE (Classe - 4D) Desc",
        "CNAE (Classe - 5D)",
        "CNAE (Classe - 5D) Desc",
        "Soma Total Bruto Produtos",
      ];
    }
    if (agrupar == "emissor") {
      options.headers = [
        "Código Município Emissor",
        "Município Emissor",
        "UF Emissor",
        "Soma Total Bruto Produtos",
      ];
    }
    if (agrupar == "destinatario") {
      options.headers = [
        "Código Município Destinatário",
        "Município Destinatário",
        "UF Destinatário",
        "Soma Total Bruto Produtos",
      ];
    }
    if (agrupar == "cfop") {
      options.headers = [
        "CFOP",
        "Descrição CFOP",
        "CFOP (1D)",
        "CFOP (2D)",
        "CFOP (3D)",
        "Soma Total Bruto Produtos",
      ];
    }
    if (agrupar == "scr") {
      options.headers = [
        "SCR 2010 Trabalho",
        "SCR 2010 Trabalho Desc",
        "SCR 2010 Divulga",
        "SCR 2010 Divulga Desc",
        "Soma Total Bruto Produtos",
      ];
    }

    const csvExporter = new ExportToCsv(options);

    const csvData = csvExporter.generateCsv(dados, true);
    fs.writeFileSync("tabela.csv", csvData);
    res.download("tabela.csv");
    return;
  });
});

app.post("/updatename", async (req, res) => {
  let { nome, sobrenome } = req.body;
  let errors = [];
  if (!nome || !sobrenome) {
    errors.push({ message: "Preencha todos os campos" });
  }
  if (errors.length > 0) {
    req.flash("error", errors[0].message);
    res.redirect("/editar");
    return;
  }

  pool.query(
    `UPDATE usuarios
        SET nome = $1, sobrenome = $2
        WHERE email = $3`,
    [nome, sobrenome, req.user.email],
    (err, results) => {
      if (err) {
        throw err;
      }

      req.flash(
        "success_msg",
        "Seu nome e sobrenome foram alterados com sucesso!"
      );
      res.redirect("/editar");
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
    res.redirect("/editar");
    return;
  }

  pool.query(
    `UPDATE usuarios
        SET telefone = $1
        WHERE email = $2`,
    [f.formatarTelefone(telefone), req.user.email],
    (err, results) => {
      if (err) {
        throw err;
      }

      req.flash("success_msg", "Seu telefone foi alterado com sucesso!");
      res.redirect("/editar");
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
    res.redirect("/editar");
    return;
  }

  pool.query(
    `SELECT * FROM usuarios
        WHERE nomeusuario = $1`,
    [nick],
    (err, results) => {
      if (results.rows.length > 0) {
        errors.push({ message: "Nome de usuário já cadastrado!" });
        req.flash("error", errors[0].message);
        res.redirect("/editar");
      } else {
        pool.query(
          `UPDATE usuarios
                    SET nomeusuario = $1
                    WHERE email = $2`,
          [nick, req.user.email],
          (erro, resultados) => {
            req.flash("success_msg", "Seu nome de usuário foi alterado!");
            res.redirect("/editar");
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
    res.redirect("/editar");
    return;
  }

  pool.query(
    `SELECT * FROM usuarios
        WHERE email = $1`,
    [email],
    (err, results) => {
      if (results.rows.length > 0) {
        errors.push({ message: "E-mail já cadastrado!" });
        req.flash("error", errors[0].message);
        res.redirect("/editar");
      } else {
        pool.query(
          `UPDATE usuarios
                    SET email = $1
                    WHERE nomeusuario = $2`,
          [email, req.user.nomeusuario],
          (erro, resultados) => {
            req.flash("success_msg", "Seu e-mail foi alterado!");
            res.redirect("/editar");
          }
        );
      }
    }
  );
});

app.post("/updatepassword", async (req, res) => {
  let { senha, senha2 } = req.body;
  let errors = [];
  if ((!senha, !senha2)) {
    errors.push({ message: "Preencha todos os campos" });
  } else if (senha != senha2) {
    errors.push({ message: "As senhas não são iguais" });
  } else {
    var hashedPassword = await bcrypt.hash(senha, 10);
  }
  if (errors.length > 0) {
    req.flash("error", errors[0].message);
    res.redirect("/editar");
    return;
  }

  pool.query(
    `UPDATE usuarios
        SET senha = $1
        WHERE email = $2`,
    [hashedPassword, req.user.email],
    (err, results) => {
      if (err) {
        throw err;
      }

      req.flash("success_msg", "Sua senha foi alterada com sucesso!");
      res.redirect("/editar");
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
    res.render("forgot", { errors });
    return;
  } else {
    //Formulário foi validado
    var senha = require("./public/js/util").gerarSenha();
    var hashedPassword = await bcrypt.hash(senha, 10);
  }

  pool.query(
    `SELECT * FROM usuarios
        WHERE email = $1`,
    [email],
    (err, results) => {
      // verifica se há algum usuario no banco de dados com o e-mail cadastrado
      if (results.rows.length < 1) {
        errors.push({ message: "E-mail não encontrado" });
        res.render("forgot", { errors });
      } else {
        pool.query(
          `UPDATE usuarios
                SET senha = $1
                WHERE email = $2`,
          [hashedPassword, results.rows[0].email],
          (erro, dados) => {
            if (err) {
              throw err;
            }

            require("./public/js/mail")(
              results.rows[0].email,
              "Sua nova senha do MIP/TRU",
              "Olá, " + results.rows[0].nome + ", sua nova senha é " + senha
            );
            req.flash(
              "success_msg",
              "Sua nova senha foi enviada pro seu e-mail. Por favor, faça login."
            );
            res.redirect("/login");
          }
        );
      }
    }
  );
});

// rota para cadastrar usuários
app.post("/cadastro", async (req, res) => {
  let { nome, sobrenome, email, usuario, telefone, perfil, senha, senha2 } =
    req.body;

  email = email.toLowerCase().trim();
  usuario = f.removeAcento(usuario.toLowerCase().trim());

  // cria um vetor de erros
  let errors = [];

  // após verificações, adiciona erros no vetor
  if (
    !nome ||
    !sobrenome ||
    !email ||
    !usuario ||
    !telefone ||
    !senha ||
    !senha2
  ) {
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
    res.render("cadastro", { errors });
    return;
  } else {
    //Formulário foi validado
    var hashedPassword = await bcrypt.hash(senha, 10);
  }

  pool.query(
    `SELECT * FROM usuarios
        WHERE email = $1`,
    [email],
    (err, results) => {
      // verifica se há algum usuario no banco de dados com o e-mail cadastrado
      if (results.rows.length > 0) {
        errors.push({ message: "E-mail já cadastrado" });
        res.render("cadastro", { errors });
      } else {
        pool.query(
          `SELECT * FROM usuarios
                    WHERE nomeusuario = $1`,
          [usuario],
          (err, results) => {
            if (err) {
              throw err;
            }
            // verifica se há algum usuario no banco de dados com o nome de usuário cadastrado
            if (results.rows.length > 0) {
              errors.push({ message: "Nome de Usuário já cadastrado" });
              res.render("cadastro", { errors });
            } else {
              pool.query(
                `INSERT INTO usuarios (nome, sobrenome, email, nomeusuario, telefone, perfil, senha)
                                VALUES ($1, $2, $3, $4, $5, $6, $7)
                                RETURNING id, senha`,
                [
                  nome,
                  sobrenome,
                  email,
                  usuario,
                  f.formatarTelefone(telefone),
                  perfil,
                  hashedPassword,
                ],
                (err, results) => {
                  if (err) {
                    throw err;
                  }

                  req.flash(
                    "success_msg",
                    "Você registrou um novo usuário. Um novo login já pode ser feito."
                  );
                  res.redirect("/login");
                }
              );
            }
          }
        );
      }
    }
  );
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
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// função de verificação de autenticação
function checkAuthenticated(req, res, next) {
  // se estiver autenticado, redireciona para página inicial
  if (req.isAuthenticated() && permission(req)) {
    return res.redirect("/");
  }
  next();
}

// função de verificação de não-autenticação
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated() && permission(req)) {
    return next();
  }
  // se não estiver autenticado, redireciona para página de login
  res.redirect("/login");
}

// starta o servidor
app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}🦽`);
});

//==================================================================================================

app.get("*", function (req, res) {
  res.status(404).render("error404");
});
