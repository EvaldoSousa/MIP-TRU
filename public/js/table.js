let conteudo = document.getElementById("conteudo");
let rodape = document.getElementById("myFooter");
let carregamento = document.getElementById("carregamento");

conteudo.classList.toggle("d-none");
setTimeout(function() {
    rodape.classList.toggle("fixed-bottom");
    carregamento.style.display = "none";
}, 3000);