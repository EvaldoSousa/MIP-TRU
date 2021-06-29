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

function buscar(ano, entrada, destinatario, cnae) {
    let txt = 'SELECT ano, entrada, destinatario, cnae FROM entradas WHERE ';

    if(ano) {
        txt += "ano ilike \'%" + ano + "%\' ";
    }
    if(entrada) {
        if(ano) {
            txt += "and"
        }
        txt += " entrada ilike \'%" + entrada + "%\' ";
    }
    if(destinatario) {
        if(ano || entrada) {
            txt += "and"
        }
        txt += " destinatario ilike \'%" + destinatario + "%\' ";
    }
    if(cnae) {
        if(ano || entrada || destinatario) {
            txt += "and"
        }
        txt += " cnae ilike \'" + cnae + "%\'";
    }
    return txt;
}

function buscarSelect(entrada) {
    let txt = 'SELECT DISTINCT ';

    if(entrada == 'ano') {
        txt += "ano FROM entradas order by ano asc";
    }
    if(entrada == 'destinatario') {
        txt += "destinatario FROM entradas order by destinatario asc";
    }
    if(entrada == 'cnae') {
        txt += "cnae FROM entradas order by cnae asc";
    }
    if(entrada == 'entrada') {
        txt += "entrada FROM entradas order by entrada asc";
    }
    return txt;
}

module.exports = {formatarTelefone, reverseFormat, removeAcento, buscar, buscarSelect};
