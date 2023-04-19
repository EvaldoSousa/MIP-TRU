const password = document.getElementById('password');
const toggle = document.getElementById('toggle');
const footer = document.querySelector('.footer');

function showHide() {
    if (password.type === 'password') {
        password.setAttribute('type', 'text');
        toggle.classList.add('hide');
    } else {
        password.setAttribute('type', 'password');
        toggle.classList.remove('hide');
    }
}

function entendi(){
    footer.style.display = 'none';
}

// Deixa a tela de login login bonitinha
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
