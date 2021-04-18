function formatarTelefone(telefone) {
    return telefone.replace('(', '').replace(')', '').replace('-', '').replace(/ /g, '');
}

module.exports = formatarTelefone;