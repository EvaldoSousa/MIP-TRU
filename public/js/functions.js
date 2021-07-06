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

function buscar(municipio_emissor, uf_emissor, municipio_destinatario, uf_destinatario, 
    cfop, cfop_1d, cfop_2d, cfop_3d, cnae, cnae_divisao, cnae_grupo, 
    cnae_classe_4d, cnae_classe_5d, scr_2010_trabalho, scr_2010_divulga, ncm_produto) {
    let txt = `SELECT municipio_emissor, uf_emissor, municipio_destinatario, uf_destinatario, 
    cfop, desc_cfop, cfop_1d, cfop_2d, cfop_3d, cnae, desc_cnae, cnae_divisao, cnae_divisao_desc, cnae_grupo, 
    cnae_grupo_desc, cnae_classe_4d, cnae_classe_4d_desc, cnae_classe_5d, cnae_classe_5d_desc, scr_2010_trabalho, 
    scr_2010_trabalho_desc, scr_2010_divulga, scr_2010_divulga_desc, ncm_produto, total_bruto_produtos FROM entradas`;

    // if(ano) {
    //     txt += "ano ilike \'%" + ano + "%\' ";
    // }
    // if(entrada) {
    //     if(ano) {
    //         txt += "and"
    //     }
    //     txt += " entrada ilike \'%" + entrada + "%\' ";
    // }
    // if(destinatario) {
    //     if(ano || entrada) {
    //         txt += "and"
    //     }
    //     txt += " destinatario ilike \'%" + destinatario + "%\' ";
    // }
    // if(cnae) {
    //     if(ano || entrada || destinatario) {
    //         txt += "and"
    //     }
    //     txt += " cnae ilike \'" + cnae + "%\'";
    // }
    return txt;
}

function buscarSelect(entrada) {
    let txt = 'SELECT DISTINCT ';

    if(entrada == 'municipio_emissor') {
        txt += "municipio_emissor FROM entradas order by municipio_emissor asc";
    }
    if(entrada == 'uf_emissor') {
        txt += "uf_emissor FROM entradas order by uf_emissor asc";
    }
    if(entrada == 'municipio_destinatario') {
        txt += "municipio_destinatario FROM entradas order by municipio_destinatario asc";
    }
    if(entrada == 'uf_destinatario') {
        txt += "uf_destinatario FROM entradas order by uf_destinatario asc";
    }
    if(entrada == 'cfop') {
        txt += "cfop FROM entradas order by cfop asc";
    }
    if(entrada == 'cfop_1d') {
        txt += "cfop_1d FROM entradas order by cfop_1d asc";
    }
    if(entrada == 'cfop_2d') {
        txt += "cfop_2d FROM entradas order by cfop_2d asc";
    }
    if(entrada == 'cfop_3d') {
        txt += "cfop_3d FROM entradas order by cfop_3d asc";
    }
    if(entrada == 'cnae') {
        txt += "cnae FROM entradas order by cnae asc";
    }
    if(entrada == 'cnae_divisao') {
        txt += "cnae_divisao FROM entradas order by cnae_divisao asc";
    }
    if(entrada == 'cnae_grupo') {
        txt += "cnae_grupo FROM entradas order by cnae_grupo asc";
    }
    if(entrada == 'cnae_classe_4d') {
        txt += "cnae_classe_4d FROM entradas order by cnae_classe_4d asc";
    }
    if(entrada == 'cnae_classe_5d') {
        txt += "cnae_classe_5d FROM entradas order by cnae_classe_5d asc";
    }
    if(entrada == 'scr_2010_trabalho') {
        txt += "scr_2010_trabalho FROM entradas order by scr_2010_trabalho asc";
    }
    if(entrada == 'scr_2010_divulga') {
        txt += "scr_2010_divulga FROM entradas order by scr_2010_divulga asc";
    }
    if(entrada == 'ncm_produto') {
        txt += "ncm_produto FROM entradas order by ncm_produto asc";
    }
    return txt;
}

module.exports = {formatarTelefone, reverseFormat, removeAcento, buscar, buscarSelect};
