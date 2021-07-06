let btn_csv = document.getElementById('csv');
let form = document.getElementById('form');

function startCsv () {
    btn_csv.classList.add("button--loading");
}

function finishCsv () {
    btn_csv.classList.remove("button--loading");
}

