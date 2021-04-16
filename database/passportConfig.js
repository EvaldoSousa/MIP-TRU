const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./dbConfig');
const bcrypt = require('bcrypt');

function initialize (passport) {
    const authenticateUser = (usuario, senha, done) => {
        pool.query(
            `SELECT * FROM usuarios WHERE nomeusuario = $1`, [usuario], (err, results) => {
                if(err) {
                    throw err;
                }

                if(results.rows.length > 0) {
                    const user = results.rows[0];

                    bcrypt.compare(senha, user.senha, (err, isMatch) => {
                        if(err) {
                            throw err;
                        }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {message: "Senha Incorreta"});
                        }
                    });
                } else {
                    return done(null, false, {message: "Nome de Usuário Não Encontrado"});
                }
            }
        )
    }
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'usuario',
                passwordField: 'senha'
            },
            authenticateUser
        )
    );

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        pool.query(
            `SELECT * FROM usuarios WHERE id = $1`, [id], (err, results) => {
                if (err) {
                    throw err;
                }
                return done(null, results.rows[0]);
            }
        )
    })
}

module.exports = initialize;