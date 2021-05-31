function formatarTelefone(telefone) {
    if(telefone.length < 12) {
        return telefone;
    }
    return telefone.replace('(', '').replace(')', '').replace('-', '').replace(/ /g, '');
}

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

function removeAcento(text){       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃÄ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊË]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎÏ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕÖ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛÜ]','gi'), 'u');
    return text;                 
}

module.exports = {formatarTelefone, reverseFormat, removeAcento};
