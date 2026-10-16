const botaoAceitar = document.getElementById("aceitar-inscricao");
const botaoRecusar = document.getElementById("recusar-inscricao");


function atualizarDecisao(status) {
    if (status === "aceita") {
        botaoAceitar.disabled = true;
        botaoRecusar.disabled = false;

        botaoAceitar.textContent = "✓ Inscrição aceita";
        botaoRecusar.textContent = "✕ Recusar inscrição";

        botaoAceitar.classList.add("decisao-botao--selecionado");

        botaoRecusar.classList.remove("decisao-botao--selecionado");
    }

    if (status === "recusada") {
        botaoRecusar.disabled = true;
        botaoAceitar.disabled = false;

        botaoRecusar.textContent = "✕ Inscrição recusada";
        botaoAceitar.textContent = "✓ Aceitar inscrição";

        botaoRecusar.classList.add("decisao-botao--selecionado");

        botaoAceitar.classList.remove("decisao-botao--selecionado");
    }


    console.log({
        bandaId: 1,
        statusInscricao: status
    });
}


botaoAceitar.addEventListener(
    "click",
    () => {
        atualizarDecisao("aceita");
    }
);


botaoRecusar.addEventListener(
    "click",
    () => {
        atualizarDecisao("recusada");
    }
);