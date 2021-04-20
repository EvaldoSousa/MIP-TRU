const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./dbConfig');
const bcrypt = require('bcrypt');

// inicializa o Passport
function initialize (passport) {
    // autenticação do usuário
    const authenticateUser = (usuario, senha, done) => {
        pool.query(
            `SELECT * FROM usuarios WHERE nomeusuario = $1`, [usuario], (err, results) => {
                if(err) {
                    throw err;
                }

                // se a busca por nome de usuários resultar em algo
                // crie um user com as colunas do dado encontrado
                if(results.rows.length > 0) {
                    const user = results.rows[0];

                    // compara a senha criptografada com a senha digitada pelo usuário
                    bcrypt.compare(senha, user.senha, (err, isMatch) => {
                        if(err) {
                            throw err;
                        }
                        // caso igual, finaliza e retorna o usuário
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            // caso diferente, finaliza e retorna a mensagem
                            return done(null, false, {message: "Senha Incorreta"});
                        }
                    });

                // caso a busca não resulte em nenhum usuário
                } else {
                    // finaliza e retorna mensagem de erro
                    return done(null, false, {message: "Nome de Usuário Não Encontrado"});
                }
            }
        )
    }
    passport.use(
        // cria a estratégia local de login
        new LocalStrategy(
            {
                // define os campos de verificação
                usernameField: 'usuario',
                passwordField: 'senha'
            },
            authenticateUser
        )
    );

    //armazena o id do usuário na sessão para ser invocado no req
    passport.serializeUser((user, done) => done(null, user.id));


    //escolhendo qual dado armazenar para depois invocar o usuário logado
    passport.deserializeUser((id, done) => {
        pool.query(
            `SELECT * FROM usuarios WHERE id = $1`, [id], (err, results) => {
                if (err) {
                    throw err;
                }
                //procura o id armazenado em sessão e o usa para anexar o usuário quando
                // o req.user for chamado
                return done(null, results.rows[0]);
            }
        )
    })
}

module.exports = initialize;