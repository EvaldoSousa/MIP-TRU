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
    return txt;
}

console.log(buscarSelect('destinatario'));