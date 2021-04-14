const http = require("http");
const express = require("express");
const app = express();
const path = require('path');
const router = express.Router();

//rota para arquivos estáticos (img, css, js)
app.use(express.static("public"));

//rota GET

//rota para página index.html
app.use('/', require('./routes/index.js'));

//rota para página inicial.html
app.use('/inicial', require('./routes/inicial.js'));

//rota para página cadastro.html
app.use('/cadastro', require('./routes/cadastro.js'));

//rota para página cadastro.html
app.use('/table', require('./routes/table.js'));

app.use(function(req, res, next){
    res.status(404).sendFile(path.join(__dirname + '/views/error404.html'));
});

http.createServer(app).listen(3001, () => {
    console.log("Servidor front-end na porta 3001🦽");}
);