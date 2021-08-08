original = "jubileu=opção1&jubileu=opção2&jubileu=opção3";

// /&/g substitui todas as ocorrências de & por uma string vazia
semEComercial = original.replace(/&/g, "");

// separa a string em um vetor, sempre que achar um "jubileu=" manda a string pra uma posição diferente do vetor
stringCortada = semEComercial.split("jubileu=");

//função pra remover as strings vazias
stringFinal = stringCortada.filter(function (string) {
    if (string != "") {
        return string;
    }
})

console.log(stringFinal);