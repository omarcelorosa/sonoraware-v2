const campoBusca = document.getElementById(
    "buscar-banda"
);

const filtroEstilo = document.getElementById(
    "filtro-estilo"
);

const filtroCidade = document.getElementById(
    "filtro-cidade"
);

const filtroStatus = document.getElementById(
    "filtro-status"
);

const botaoLimparFiltros = document.getElementById(
    "limpar-filtros"
);

const listaBandas = document.getElementById(
    "lista-bandas"
);

const estadoVazio = document.getElementById(
    "bandas-vazio"
);

const cardsBandas = document.querySelectorAll(
    ".banda-card"
);


function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}


function atualizarEstadoVazio() {
    const cardsVisiveis =
        Array.from(cardsBandas).filter(
            card =>
                card.style.display !== "none"
        );

    if (cardsVisiveis.length === 0) {
        listaBandas.hidden = true;
        estadoVazio.hidden = false;

        return;
    }

    listaBandas.hidden = false;
    estadoVazio.hidden = true;
}


function aplicarFiltros() {
    const busca =
        normalizarTexto(
            campoBusca.value
        );

    const estiloSelecionado =
        filtroEstilo.value;

    const cidadeSelecionada =
        filtroCidade.value;

    const statusSelecionado =
        filtroStatus.value;


    cardsBandas.forEach(
        card => {
            const nomeBanda =
                normalizarTexto(
                    card.querySelector(
                        ".banda-card__principal h2"
                    ).textContent
                );

            const estilos =
                card.dataset.estilos;

            const cidade =
                card.dataset.cidade;

            const status =
                card.dataset.status;


            const correspondeBusca =
                busca === "" ||
                nomeBanda.includes(busca);

            const correspondeEstilo =
                estiloSelecionado === "todos" ||
                estilos
                    .split(" ")
                    .includes(
                        estiloSelecionado
                    );

            const correspondeCidade =
                cidadeSelecionada === "todas" ||
                cidade === cidadeSelecionada;

            const correspondeStatus =
                statusSelecionado === "todos" ||
                status === statusSelecionado;


            if (
                correspondeBusca &&
                correspondeEstilo &&
                correspondeCidade &&
                correspondeStatus
            ) {
                card.style.display = "grid";
            } else {
                card.style.display = "none";
            }
        }
    );


    atualizarEstadoVazio();
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


filtroStatus.addEventListener(
    "change",
    aplicarFiltros
);


botaoLimparFiltros.addEventListener(
    "click",
    () => {
        campoBusca.value = "";

        filtroEstilo.value =
            "todos";

        filtroCidade.value =
            "todas";

        filtroStatus.value =
            "todos";

        aplicarFiltros();
    }
);


function atualizarStatusCard(
    card,
    novoStatus
) {
    const statusContainer =
        card.querySelector(
            ".banda-card__status"
        );

    const statusElemento =
        statusContainer.querySelector(
            ".status"
        );


    statusElemento.className =
        "status";

    card.dataset.status =
        novoStatus;


    if (novoStatus === "aceita") {
        statusElemento.classList.add(
            "status--aceita"
        );

        statusElemento.textContent =
            "Aceita";
    }


    if (novoStatus === "recusada") {
        statusElemento.classList.add(
            "status--recusada"
        );

        statusElemento.textContent =
            "Recusada";
    }


    aplicarFiltros();
}


cardsBandas.forEach(
    card => {
        const botaoAceitar =
            card.querySelector(
                ".banda-card__botao--aceitar"
            );

        const botaoRecusar =
            card.querySelector(
                ".banda-card__botao--recusar"
            );


        botaoAceitar.addEventListener(
            "click",
            () => {
                atualizarStatusCard(
                    card,
                    "aceita"
                );

                botaoAceitar.disabled =
                    true;

                botaoRecusar.disabled =
                    false;
            }
        );


        botaoRecusar.addEventListener(
            "click",
            () => {
                atualizarStatusCard(
                    card,
                    "recusada"
                );

                botaoRecusar.disabled =
                    true;

                botaoAceitar.disabled =
                    false;
            }
        );
    }
);


aplicarFiltros();