
function validform() {

    var nome = document.forms["my-form"]["full-name"].value;
    var email = document.forms["my-form"]["email-address"].value;
    var userName = document.forms["my-form"]["username"].value;
    var senhaI = document.forms["my-form"]["senha"].value;

    // var senhaII = document.forms["my-form"]["senhaII"].value

    // if (nome==null || nome=="")
    // {
    //     alert("Por favor insira seu nome completo");
    //     return false;
    // }else if (email==null || email=="")
    // {
    //     alert("Por favor insira um E-mail valido");
    //     return false;
    // }else if (userName==null || userName=="")
    // {
    //     alert("Por favor inisra um nome de usuário");
    //     return false;
    // }else if (senhaI==null || senhaI=="")
    // {
    //     alert("Por favor insira uma senha");
    //     return false;
    // }else if(senhaII==null || senhaII==""){
    //     alert("Por favor confirme sua senha");
    //     return false;
    // }else if(senhaII != senhaI || senhaII == null || senhaII == "" ){
    //     alert("Senhas não coincidem");
    //     return false;
    // }
}

//==================================================================================================
const nomeInput = document.getElementById('full_name');
const emailInput = document.getElementById('email_address');
const nomeUsuarioInput = document.getElementById('user_name');
const telefoneInput = document.getElementById('phone_number');
const senhaInput = document.getElementById('Senha');

const nome = nomeInput.value;
const email = emailInput.value;
const usuario = nomeUsuarioInput.value;
const telefone = telefoneInput.value;
const senha = senhaInput.value;

const botao = document.getElementById('botaoCadastrar');

function enviar(nome, email, usuario, telefone, senha) {
    axios.post('http://localhost:3000/usuarios', {
        nome: nome,
        email: email,
        usuario: usuario,
        telefone: telefone,
        senha: senha
        }
    )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

botao.onclick = function cadastrar() {
    enviar(nomeInput.value, emailInput.value, nomeUsuarioInput.value, telefoneInput.value, senhaInput.value);
    alert('Cadastro Realizado com Sucesso');
};

// function deletarUsuario(id) {
//     axios.delete('http://localhost:3000/usuarios', {
//         id: id
//     })
//         .then(function (response) {
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }