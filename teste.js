var tel = '94992760279';

function reverseFormat (telefone) {
    var tels = [];
    var phormat = '';
    for (let i = 0; i < telefone.length; i++) {
        tels[i] = telefone.charAt(i);
    }
    for (let i = 0; i < telefone.length; i++) {
        if(i == 0) {
            phormat += '(' + tels[i];
        } else if (i == 1) {
            phormat += tels[i] + ') ';
        } else if (i == 2) {
            phormat += tels[i] + ' ';
        } else if (i == 6) {
            phormat += tels[i] + '-';
        }
         else {
            phormat += tels[i];
        }
    }
    return phormat;
}

console.log(reverseFormat(tel));