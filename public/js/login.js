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

// document.oncontextmenu = function(){return false};