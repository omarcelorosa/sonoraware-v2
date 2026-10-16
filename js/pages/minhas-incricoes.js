const listaSolicitacoes = document.getElementById(
    "lista-solicitacoes"
);

const estadoVazio = document.getElementById(
    "solicitacoes-vazio"
);

const cardsSolicitacoes = document.querySelectorAll(
    ".solicitacao-card"
);


function atualizarEstadoLista() {
    const quantidadeSolicitacoes =
        cardsSolicitacoes.length;

    if (quantidadeSolicitacoes === 0) {
        listaSolicitacoes.hidden = true;
        estadoVazio.hidden = false;

        return;
    }

    listaSolicitacoes.hidden = false;
    estadoVazio.hidden = true;
}


function prepararSolicitacoes() {
    cardsSolicitacoes.forEach(
        (card) => {
            const status =
                card.dataset.status;

            if (status === "encerrada") {
                card.classList.add(
                    "solicitacao-card--encerrada"
                );
            }
        }
    );
}


prepararSolicitacoes();
atualizarEstadoLista();