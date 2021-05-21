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
        // Setup - add a text input to each footer cell
        $('#example tfoot th').each(function () {
            var title = $(this).text();
            $(this).html('<input type="text" placeholder="Pesquisa ' + title + '" />');
        });

        // DataTable
        var table = $('#example').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'],

            "buttons": {
                "copy": "Copiar",
            },



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
                    "previous": "Anterior"
                },
            },
            initComplete: function () {
                // Apply the search
                this.api().columns().every(function () {
                    var that = this;

                    $('input', this.footer()).on('keyup change clear', function () {
                        if (that.search() !== this.value) {
                            that
                                .search(this.value)
                                .draw();
                        }
                    });
                });
            }
        });
    });


});


