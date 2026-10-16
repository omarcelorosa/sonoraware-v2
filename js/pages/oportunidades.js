const campoBusca = document.getElementById(
    "buscar-oportunidade"
);

const filtroEstilo = document.getElementById(
    "filtro-estilo"
);

const filtroCidade = document.getElementById(
    "filtro-cidade"
);

const filtroNegociacao = document.getElementById(
    "filtro-negociacao"
);

const botaoLimparFiltros = document.getElementById(
    "limpar-filtros"
);

const listaOportunidades = document.getElementById(
    "lista-oportunidades"
);

const estadoVazio = document.getElementById(
    "oportunidades-vazio"
);

const cardsOportunidades = document.querySelectorAll(
    ".oportunidade-card"
);


function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}


function atualizarEstadoVazio() {
    const cardsVisiveis = Array.from(
        cardsOportunidades
    ).filter(
        card => card.style.display !== "none"
    );

    if (cardsVisiveis.length === 0) {
        listaOportunidades.hidden = true;
        estadoVazio.hidden = false;

        return;
    }

    listaOportunidades.hidden = false;
    estadoVazio.hidden = true;
}


function aplicarFiltros() {
    const busca = normalizarTexto(
        campoBusca.value
    );

    const estiloSelecionado =
        filtroEstilo.value;

    const cidadeSelecionada =
        filtroCidade.value;

    const negociacaoSelecionada =
        filtroNegociacao.value;


    cardsOportunidades.forEach(
        card => {
            const titulo = normalizarTexto(
                card.querySelector(
                    ".oportunidade-card__titulo h2"
                ).textContent
            );

            const estabelecimento =
                normalizarTexto(
                    card.querySelector(
                        ".oportunidade-card__titulo p"
                    ).textContent
                );

            const estilos =
                card.dataset.estilos
                    .split(" ");

            const cidade =
                card.dataset.cidade;

            const negociacao =
                card.dataset.negociacao;


            const correspondeBusca =
                busca === "" ||
                titulo.includes(busca) ||
                estabelecimento.includes(busca);


            const correspondeEstilo =
                estiloSelecionado === "todos" ||
                estilos.includes(
                    estiloSelecionado
                );


            const correspondeCidade =
                cidadeSelecionada === "todas" ||
                cidade === cidadeSelecionada;


            const correspondeNegociacao =
                negociacaoSelecionada === "todas" ||
                negociacao === negociacaoSelecionada;


            if (
                correspondeBusca &&
                correspondeEstilo &&
                correspondeCidade &&
                correspondeNegociacao
            ) {
                card.style.display = "grid";
            } else {
                card.style.display = "none";
            }
        }
    );


    atualizarEstadoVazio();
}


function limparFiltros() {
    campoBusca.value = "";

    filtroEstilo.value =
        "todos";

    filtroCidade.value =
        "todas";

    filtroNegociacao.value =
        "todas";

    aplicarFiltros();
}


campoBusca.addEventListener(
    "input",
    aplicarFiltros
);


filtroEstilo.addEventListener(
    "change",
    aplicarFiltros
);


filtroCidade.addEventListener(
    "change",
    aplicarFiltros
);


filtroNegociacao.addEventListener(
    "change",
    aplicarFiltros
);


botaoLimparFiltros.addEventListener(
    "click",
    limparFiltros
);  


aplicarFiltros();