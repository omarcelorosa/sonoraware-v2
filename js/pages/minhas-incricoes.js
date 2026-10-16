const campoBusca = document.getElementById("buscar-inscricao");
const filtroStatus = document.getElementById("filtro-status");
const botaoLimparFiltros = document.getElementById("limpar-filtros");

const listaInscricoes = document.getElementById("lista-inscricoes");
const estadoVazio = document.getElementById("inscricoes-vazio");

const cardsInscricoes = document.querySelectorAll(".inscricao-card");


function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}


function aplicarFiltros() {
    const busca = normalizarTexto(campoBusca.value);

    const statusSelecionado = filtroStatus.value;

    let quantidadeVisivel = 0;


    cardsInscricoes.forEach(card => {
        const nomeEvento = normalizarTexto(
            card.querySelector(
                ".inscricao-card__titulo h2"
            ).textContent
        );

        const estabelecimento = normalizarTexto(
            card.querySelector(
                ".inscricao-card__titulo p"
            ).textContent
        );

        const status = card.dataset.status;


        const correspondeBusca =
            busca === "" ||
            nomeEvento.includes(busca) ||
            estabelecimento.includes(busca);


        const correspondeStatus =
            statusSelecionado === "todos" ||
            status === statusSelecionado;


        if (
            correspondeBusca &&
            correspondeStatus
        ) {
            card.style.display = "grid";
            quantidadeVisivel++;
        } else {
            card.style.display = "none";
        }
    });


    if (quantidadeVisivel === 0) {
        listaInscricoes.style.display = "none";
        estadoVazio.hidden = false;
    } else {
        listaInscricoes.style.display = "flex";
        estadoVazio.hidden = true;
    }
}


function limparFiltros() {
    campoBusca.value = "";
    filtroStatus.value = "todos";

    aplicarFiltros();
}


campoBusca.addEventListener(
    "input",
    aplicarFiltros
);

filtroStatus.addEventListener(
    "change",
    aplicarFiltros
);

botaoLimparFiltros.addEventListener(
    "click",
    limparFiltros
);


aplicarFiltros();