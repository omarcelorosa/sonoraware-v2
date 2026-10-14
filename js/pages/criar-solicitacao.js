const formularioSolicitacao = document.getElementById(
    "form-criar-solicitacao"
);

const campoDataEvento = document.getElementById(
    "data-evento"
);

const campoPrazoInscricao = document.getElementById(
    "prazo-inscricao"
);

const campoHorarioInicio = document.getElementById(
    "horario-inicio"
);

const campoHorarioFim = document.getElementById(
    "horario-fim"
);

const campoDuracaoHoras = document.getElementById(
    "duracao-horas"
);

const campoDuracaoMinutos = document.getElementById(
    "duracao-minutos"
);

const statusDuracao = document.getElementById(
    "status-duracao"
);

const estilosMusicais = document.querySelectorAll(
    'input[name="estilos"]'
);

const statusEstilos = document.getElementById(
    "status-estilos"
);

const campoValorCache = document.getElementById(
    "valor-cache"
);

const estruturas = document.querySelectorAll(
    'input[name="estrutura"]'
);

const botaoPublicar = document.getElementById(
    "botao-criar-solicitacao"
);

const statusSolicitacao = document.getElementById(
    "status-solicitacao"
);

let envioEmAndamento = false;


function aplicarMascaraData(campo) {
    campo.addEventListener(
        "input",
        () => {
            let valor =
                campo.value.replace(
                    /\D/g,
                    ""
                );

            valor =
                valor.substring(
                    0,
                    8
                );

            if (valor.length > 4) {
                valor =
                    `${valor.slice(0, 2)}/${valor.slice(2, 4)}/${valor.slice(4)}`;
            } else if (valor.length > 2) {
                valor =
                    `${valor.slice(0, 2)}/${valor.slice(2)}`;
            }

            campo.value =
                valor;

            campo.setCustomValidity("");

            campo.classList.remove(
                "campo-erro",
                "campo-sucesso"
            );
        }
    );
}


aplicarMascaraData(
    campoDataEvento
);

aplicarMascaraData(
    campoPrazoInscricao
);


function converterData(valor) {
    const partes =
        valor.split("/");

    if (partes.length !== 3) {
        return null;
    }

    const dia =
        Number(partes[0]);

    const mes =
        Number(partes[1]);

    const ano =
        Number(partes[2]);

    if (
        !dia ||
        !mes ||
        !ano
    ) {
        return null;
    }

    const data =
        new Date(
            ano,
            mes - 1,
            dia
        );

    if (
        data.getFullYear() !== ano ||
        data.getMonth() !== mes - 1 ||
        data.getDate() !== dia
    ) {
        return null;
    }

    return data;
}


function formatarDataBanco(valor) {
    const partes =
        valor.split("/");

    if (partes.length !== 3) {
        return null;
    }

    const dia =
        partes[0];

    const mes =
        partes[1];

    const ano =
        partes[2];

    return `${ano}-${mes}-${dia}`;
}


function validarDatas() {
    const dataEvento =
        converterData(
            campoDataEvento.value
        );

    const prazoInscricao =
        converterData(
            campoPrazoInscricao.value
        );

    campoDataEvento.classList.remove(
        "campo-erro",
        "campo-sucesso"
    );

    campoPrazoInscricao.classList.remove(
        "campo-erro",
        "campo-sucesso"
    );

    campoDataEvento.setCustomValidity("");
    campoPrazoInscricao.setCustomValidity("");

    if (!dataEvento) {
        campoDataEvento.classList.add(
            "campo-erro"
        );

        campoDataEvento.setCustomValidity(
            "Digite uma data válida no formato DD/MM/AAAA."
        );

        campoDataEvento.reportValidity();

        return false;
    }

    if (!prazoInscricao) {
        campoPrazoInscricao.classList.add(
            "campo-erro"
        );

        campoPrazoInscricao.setCustomValidity(
            "Digite uma data válida no formato DD/MM/AAAA."
        );

        campoPrazoInscricao.reportValidity();

        return false;
    }

    const hoje =
        new Date();

    hoje.setHours(
        0,
        0,
        0,
        0
    );

    if (dataEvento < hoje) {
        campoDataEvento.classList.add(
            "campo-erro"
        );

        campoDataEvento.setCustomValidity(
            "A data do evento não pode estar no passado."
        );

        campoDataEvento.reportValidity();

        return false;
    }

    if (prazoInscricao < hoje) {
        campoPrazoInscricao.classList.add(
            "campo-erro"
        );

        campoPrazoInscricao.setCustomValidity(
            "O prazo de inscrição não pode estar no passado."
        );

        campoPrazoInscricao.reportValidity();

        return false;
    }

    if (
        prazoInscricao >
        dataEvento
    ) {
        campoPrazoInscricao.classList.add(
            "campo-erro"
        );

        campoPrazoInscricao.setCustomValidity(
            "O prazo de inscrição não pode ser posterior à data do evento."
        );

        campoPrazoInscricao.reportValidity();

        return false;
    }

    campoDataEvento.setCustomValidity("");
    campoPrazoInscricao.setCustomValidity("");

    campoDataEvento.classList.add(
        "campo-sucesso"
    );

    campoPrazoInscricao.classList.add(
        "campo-sucesso"
    );

    return true;
}


campoDataEvento.addEventListener(
    "blur",
    () => {
        if (campoDataEvento.value !== "") {
            validarDatas();
        }
    }
);


campoPrazoInscricao.addEventListener(
    "blur",
    () => {
        if (
            campoDataEvento.value !== "" &&
            campoPrazoInscricao.value !== ""
        ) {
            validarDatas();
        }
    }
);


function validarHorarios() {
    const inicio =
        campoHorarioInicio.value;

    const fim =
        campoHorarioFim.value;

    campoHorarioInicio.classList.remove(
        "campo-erro",
        "campo-sucesso"
    );

    campoHorarioFim.classList.remove(
        "campo-erro",
        "campo-sucesso"
    );

    campoHorarioFim.setCustomValidity("");

    if (
        inicio === "" ||
        fim === ""
    ) {
        return false;
    }

    if (inicio === fim) {
        campoHorarioFim.setCustomValidity(
            "O horário de término deve ser diferente do horário de início."
        );

        campoHorarioFim.classList.add(
            "campo-erro"
        );

        campoHorarioFim.reportValidity();

        return false;
    }

    campoHorarioInicio.classList.add(
        "campo-sucesso"
    );

    campoHorarioFim.classList.add(
        "campo-sucesso"
    );

    return true;
}


campoHorarioInicio.addEventListener(
    "change",
    () => {
        campoHorarioFim.setCustomValidity("");

        if (
            campoHorarioFim.value !== ""
        ) {
            validarHorarios();
        }
    }
);


campoHorarioFim.addEventListener(
    "change",
    () => {
        campoHorarioFim.setCustomValidity("");

        if (
            campoHorarioInicio.value !== ""
        ) {
            validarHorarios();
        }
    }
);


function validarDuracao() {
    const horas =
        Number(
            campoDuracaoHoras.value
        );

    const minutos =
        Number(
            campoDuracaoMinutos.value
        );

    const duracaoTotal =
        (horas * 60) + minutos;

    campoDuracaoHoras.classList.remove(
        "campo-erro",
        "campo-sucesso"
    );

    campoDuracaoMinutos.classList.remove(
        "campo-erro",
        "campo-sucesso"
    );

    statusDuracao.textContent = "";

    statusDuracao.className =
        "form-status";

    if (
        Number.isNaN(horas) ||
        Number.isNaN(minutos)
    ) {
        return false;
    }

    if (horas < 0) {
        statusDuracao.textContent =
            "A duração não pode ser negativa.";

        statusDuracao.className =
            "form-status ativo erro";

        campoDuracaoHoras.classList.add(
            "campo-erro"
        );

        return false;
    }

    if (duracaoTotal < 5) {
        statusDuracao.textContent =
            "A duração mínima é de 5 minutos.";

        statusDuracao.className =
            "form-status ativo erro";

        campoDuracaoHoras.classList.add(
            "campo-erro"
        );

        campoDuracaoMinutos.classList.add(
            "campo-erro"
        );

        return false;
    }

    if (duracaoTotal > 1440) {
        statusDuracao.textContent =
            "A duração máxima é de 24 horas.";

        statusDuracao.className =
            "form-status ativo erro";

        campoDuracaoHoras.classList.add(
            "campo-erro"
        );

        campoDuracaoMinutos.classList.add(
            "campo-erro"
        );

        return false;
    }

    campoDuracaoHoras.classList.add(
        "campo-sucesso"
    );

    campoDuracaoMinutos.classList.add(
        "campo-sucesso"
    );

    return true;
}


campoDuracaoHoras.addEventListener(
    "input",
    validarDuracao
);


campoDuracaoMinutos.addEventListener(
    "change",
    validarDuracao
);


function validarEstilos() {
    const algumSelecionado =
        Array.from(
            estilosMusicais
        ).some(
            estilo =>
                estilo.checked
        );

    if (!algumSelecionado) {
        statusEstilos.textContent =
            "Selecione pelo menos um estilo musical.";

        statusEstilos.className =
            "form-status ativo erro";

        return false;
    }

    statusEstilos.textContent = "";

    statusEstilos.className =
        "form-status";

    return true;
}


estilosMusicais.forEach(
    (estilo) => {
        estilo.addEventListener(
            "change",
            () => {
                if (estilo.checked) {
                    statusEstilos.textContent =
                        "";

                    statusEstilos.className =
                        "form-status";
                }
            }
        );
    }
);


formularioSolicitacao.addEventListener(
    "submit",
    (evento) => {
        evento.preventDefault();

        if (envioEmAndamento) {
            return;
        }

        if (
            !formularioSolicitacao.checkValidity()
        ) {
            formularioSolicitacao.reportValidity();

            return;
        }

        if (!validarDatas()) {
            return;
        }

        if (!validarHorarios()) {
            return;
        }

        if (!validarDuracao()) {
            campoDuracaoHoras.focus();

            return;
        }

        if (!validarEstilos()) {
            const secaoEstilos =
                document.querySelector(
                    ".form-estilos"
                );

            secaoEstilos.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }

        const dadosFormulario =
            new FormData(
                formularioSolicitacao
            );

        const estilosSelecionados =
            Array.from(
                estilosMusicais
            )
                .filter(
                    estilo =>
                        estilo.checked
                )
                .map(
                    estilo =>
                        estilo.value
                );

        const estruturasSelecionadas =
            Array.from(
                estruturas
            )
                .filter(
                    estrutura =>
                        estrutura.checked
                )
                .map(
                    estrutura =>
                        estrutura.value
                );

        const horas =
            Number(
                dadosFormulario.get(
                    "duracaoHoras"
                )
            );

        const minutos =
            Number(
                dadosFormulario.get(
                    "duracaoMinutos"
                )
            );

        const duracaoTotalMinutos =
            (horas * 60) + minutos;

        const negociacao =
            dadosFormulario.get(
                "aceitaNegociacao"
            );

        const dadosSolicitacao = {
            titulo:
                dadosFormulario.get(
                    "titulo"
                ).trim(),

            dataEvento:
                formatarDataBanco(
                    dadosFormulario.get(
                        "dataEvento"
                    )
                ),

            prazoInscricao:
                formatarDataBanco(
                    dadosFormulario.get(
                        "prazoInscricao"
                    )
                ),

            horarioInicio:
                dadosFormulario.get(
                    "horarioInicio"
                ),

            horarioFim:
                dadosFormulario.get(
                    "horarioFim"
                ),

            quantidadeBandas:
                Number(
                    dadosFormulario.get(
                        "quantidadeBandas"
                    )
                ),

            duracaoApresentacaoMinutos:
                duracaoTotalMinutos,

            estilos:
                estilosSelecionados,

            valorCache:
                Number(
                    dadosFormulario.get(
                        "valorCache"
                    )
                ),

            aceitaNegociacao:
                negociacao === "sim",

            estrutura:
                estruturasSelecionadas,

            descricao:
                dadosFormulario.get(
                    "descricao"
                ).trim(),

            requisitos:
                dadosFormulario.get(
                    "requisitos"
                ).trim()
        };

        envioEmAndamento =
            true;

        botaoPublicar.disabled =
            true;

        botaoPublicar.textContent =
            "Publicando...";

        statusSolicitacao.textContent =
            "Preparando solicitação...";

        statusSolicitacao.className =
            "form-status criar-solicitacao__status ativo carregando";

        console.log(
            "Dados da solicitação:",
            dadosSolicitacao
        );

        setTimeout(
            () => {
                statusSolicitacao.textContent =
                    "Solicitação criada com sucesso!";

                statusSolicitacao.className =
                    "form-status criar-solicitacao__status ativo sucesso";

                botaoPublicar.textContent =
                    "Solicitação validada";
            },
            500
        );
    }
);