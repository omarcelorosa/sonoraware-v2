const botaoCandidatar = document.getElementById(
    "botao-candidatar"
);

const mensagemCandidatura = document.getElementById(
    "mensagem-candidatura"
);


function candidatarBanda() {
    botaoCandidatar.disabled = true;

    botaoCandidatar.textContent =
        "Candidatura enviada";

    mensagemCandidatura.textContent =
        "Sua banda foi inscrita nesta oportunidade.";

    console.log({
        eventoId: 1,
        acao: "candidatura",
        status: "enviada"
    });
}


botaoCandidatar.addEventListener(
    "click",
    candidatarBanda
);