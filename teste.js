function gerarCsv(row){
     
    var csv = 'Ano, Entrada, Destinatário, CNAE\n';
 
    row.forEach(function(abs) {
            csv += abs.ano;
            csv += ','+ abs.entrada;
            csv += ','+ abs.destinatario;
            csv += ','+ abs.cnae;
            csv += '\n';
    });
  
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'produtos.csv';
    hiddenElement.click();
};