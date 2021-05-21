let data = [];

function updateData() {
    return axios.get('http://localhost:3001/entrada', {
    }
    )
        .then(function (response) {
            data = response.data;
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}



$(document).ready(function () {
    updateData().then(function () {
        console.log(data);
        // Configuração - adiciona uma entrada de texto a cada célula do rodapé
        $('#example thead tr').clone(true).appendTo('#example thead');
        $('#example thead tr:eq(1) th').each(function (i) {
            var title = $(this).text();
            $(this).html('<input type="text" placeholder="Pesquisar ' + title + '" />');

            $('input', this).on('keyup change', function () {
                if (table.column(i).search() !== this.value) {
                    table
                        .column(i)
                        .search(this.value)
                        .draw();
                }
            });
        });

        // DataTable
        var table = $('#example').DataTable({
            orderCellsTop: true,
            fixedHeader: true,

            //tradução
            "data": data,
            "columns": [
                { "data": 'ano' },
                { "data": 'entrada' },
                { "data": 'destinatario' },
                { "data": 'cnae' },
            ],
            "language": {
                
                "search": "Pesquisar",
                "lengthMenu": "Mostrar _MENU_",
                "zeroRecords": "Nenhum resultado encontrado - Desculpe 😓👉👈",
                "info": "Página _PAGE_ de _PAGES_",
                "loadingRecords": "Estamos carregando pra você... 😉",
                "processing": "Um momento. Estamos processando isso pra você 🙂...",
                "infoEmpty": "Nenhum registro disponível 😐",
                "infoFiltered": "(Filtrado de um total de _MAX_ linhas)",
                "example_previous": "Anterior _PAGE_",

                "paginate": {
                    "first": "Primeira",
                    "last": "Última",
                    "next": "Próximo",
                    "previous": "Anterior",
                },
            },
        });
    });


});


