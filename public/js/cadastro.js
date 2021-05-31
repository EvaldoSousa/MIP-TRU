document.getElementById("user_name").onkeypress = function (e) {
    var chr = String.fromCharCode(e.which);
    if ("1234567890qwertyuioplkjhgfdsazxcvbnm".indexOf(chr) < 0)
        return false;
};

var texto = document.getElementById('passwordHelpBlock');
var verificacao = document.getElementById('verificacao');

function verificaSenha() {
    var senha1 = document.getElementById('Senha').value;
    var senha2 = document.getElementById('Senha2').value;
    if (senha1 != senha2) {
        texto.innerHTML = "";
        verificacao.innerHTML = "Senhas Diferentes!";
        verificacao.classList.add('alert');
        verificacao.classList.add('alert-danger');
    } else {
        verificacao.innerHTML = "";
        verificacao.classList.remove('alert');
        verificacao.classList.remove('alert-danger');
    }
}