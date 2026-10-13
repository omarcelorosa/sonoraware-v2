const campoCep = document.getElementById("cep");
const campoCidade = document.getElementById("cidade");
const campoEstado = document.getElementById("estado");
const statusCep = document.getElementById("status-cep");

const campoSenha = document.getElementById("senha");
const campoConfirmarSenha = document.getElementById("confirmar-senha");
const statusSenha = document.getElementById("status-senha");

const estilosMusicais = document.querySelectorAll(
    'input[name="estilos"]'
);

const statusEstilos = document.getElementById("status-estilos");

const opcoesInstrumentos = document.querySelectorAll(
    'input[name="instrumentosProprios"]'
);

const campoInstrumentos = document.getElementById("instrumentos");

const formularioCadastroBanda = document.getElementById(
    "form-cadastro-banda"
);

const botaoCriarPerfil = document.getElementById(
    "botao-criar-perfil"
);

const statusCadastro = document.getElementById(
    "status-cadastro"
);

let envioEmAndamento = false;


function mostrarStatusCep(texto, tipo) {
    statusCep.textContent = texto;
    statusCep.className = "form-status ativo";
    statusCep.classList.add(tipo);
}


function limparStatusCep() {
    statusCep.textContent = "";
    statusCep.className = "form-status";

    campoCep.classList.remove(
        "campo-erro",
        "campo-sucesso"
    );
}


function mostrarErroCep(texto) {
    mostrarStatusCep(texto, "erro");

    campoCep.classList.add("campo-erro");
    campoCep.classList.remove("campo-sucesso");
}


function mostrarCepValido() {
    mostrarStatusCep(
        "CEP encontrado.",
        "sucesso"
    );

    campoCep.classList.add("campo-sucesso");
    campoCep.classList.remove("campo-erro");
}


campoCep.addEventListener("input", () => {
    let valor = campoCep.value;

    valor = valor.replace(/\D/g, "");

    valor = valor.replace(
        /(\d{5})(\d)/,
        "$1-$2"
    );

    campoCep.value = valor;

    campoCidade.value = "";
    campoEstado.value = "";

    limparStatusCep();
});


campoCep.addEventListener("blur", async () => {
    const cep = campoCep.value.replace(
        /\D/g,
        ""
    );

    if (cep.length === 0) {
        return;
    }

    if (cep.length !== 8) {
        mostrarErroCep(
            "Digite um CEP válido com 8 números."
        );

        campoCidade.value = "";
        campoEstado.value = "";

        return;
    }

    mostrarStatusCep(
        "Consultando CEP...",
        "carregando"
    );

    campoCep.classList.remove(
        "campo-erro",
        "campo-sucesso"
    );

    try {
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!resposta.ok) {
            throw new Error(
                "Erro na comunicação com o serviço de CEP."
            );
        }

        const dados = await resposta.json();

        if (dados.erro) {
            mostrarErroCep(
                "CEP não encontrado."
            );

            campoCidade.value = "";
            campoEstado.value = "";

            return;
        }

        campoCidade.value =
            dados.localidade;

        campoEstado.value =
            dados.uf;

        mostrarCepValido();

    } catch (erro) {
        campoCidade.value = "";
        campoEstado.value = "";

        mostrarErroCep(
            "Não foi possível consultar o CEP no momento."
        );

        console.error(
            "Erro ao consultar CEP:",
            erro
        );
    }
});


function validarSenhas() {
    const senha = campoSenha.value;
    const confirmarSenha =
        campoConfirmarSenha.value;

    if (confirmarSenha.length === 0) {
        statusSenha.textContent = "";
        statusSenha.className =
            "form-status";

        campoConfirmarSenha.classList.remove(
            "campo-erro",
            "campo-sucesso"
        );

        return false;
    }

    if (senha !== confirmarSenha) {
        statusSenha.textContent =
            "As senhas não coincidem.";

        statusSenha.className =
            "form-status ativo erro";

        campoConfirmarSenha.classList.add(
            "campo-erro"
        );

        campoConfirmarSenha.classList.remove(
            "campo-sucesso"
        );

        return false;
    }

    statusSenha.textContent =
        "As senhas coincidem.";

    statusSenha.className =
        "form-status ativo sucesso";

    campoConfirmarSenha.classList.remove(
        "campo-erro"
    );

    campoConfirmarSenha.classList.add(
        "campo-sucesso"
    );

    return true;
}


campoConfirmarSenha.addEventListener(
    "input",
    validarSenhas
);


campoSenha.addEventListener(
    "input",
    () => {
        if (
            campoConfirmarSenha.value !== ""
        ) {
            validarSenhas();
        }
    }
);


function validarEstilos() {
    const algumSelecionado =
        Array.from(
            estilosMusicais
        ).some(
            estilo => estilo.checked
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


estilosMusicais.forEach((estilo) => {
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
});


function atualizarCampoInstrumentos() {
    const opcaoSelecionada =
        document.querySelector(
            'input[name="instrumentosProprios"]:checked'
        );

    if (!opcaoSelecionada) {
        campoInstrumentos.disabled =
            true;

        campoInstrumentos.value = "";

        return;
    }

    if (
        opcaoSelecionada.value === "sim"
    ) {
        campoInstrumentos.disabled =
            false;

        return;
    }

    campoInstrumentos.disabled = true;
    campoInstrumentos.value = "";
}


opcoesInstrumentos.forEach(
    (opcao) => {
        opcao.addEventListener(
            "change",
            atualizarCampoInstrumentos
        );
    }
);


atualizarCampoInstrumentos();


formularioCadastroBanda.addEventListener(
    "submit",
    (evento) => {
        evento.preventDefault();

        if (envioEmAndamento) {
            return;
        }

        if (!validarSenhas()) {
            campoConfirmarSenha.focus();

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
                formularioCadastroBanda
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

        const dadosBanda = {
            usuario:
                dadosFormulario.get(
                    "usuario"
                ),

            email:
                dadosFormulario.get(
                    "email"
                ),

            senha:
                dadosFormulario.get(
                    "senha"
                ),

            nomeBanda:
                dadosFormulario.get(
                    "nomeBanda"
                ),

            cep:
                dadosFormulario.get(
                    "cep"
                ),

            cidade:
                dadosFormulario.get(
                    "cidade"
                ),

            estado:
                dadosFormulario.get(
                    "estado"
                ),

            estilos:
                estilosSelecionados,

            numeroIntegrantes:
                dadosFormulario.get(
                    "numeroIntegrantes"
                ),

            anoFormacao:
                dadosFormulario.get(
                    "anoFormacao"
                ),

            responsavelNome:
                dadosFormulario.get(
                    "responsavelNome"
                ),

            responsavelFuncao:
                dadosFormulario.get(
                    "responsavelFuncao"
                ),

            responsavelTelefone:
                dadosFormulario.get(
                    "responsavelTelefone"
                ),

            responsavelEmail:
                dadosFormulario.get(
                    "responsavelEmail"
                ),

            descricao:
                dadosFormulario.get(
                    "descricao"
                ),

            repertorio:
                dadosFormulario.get(
                    "repertorio"
                ),

            instrumentosProprios:
                dadosFormulario.get(
                    "instrumentosProprios"
                ),

            instrumentos:
                dadosFormulario.get(
                    "instrumentos"
                ),

            disponibilidade:
                dadosFormulario.get(
                    "disponibilidade"
                ),

            instagram:
                dadosFormulario.get(
                    "instagram"
                ),

            youtube:
                dadosFormulario.get(
                    "youtube"
                )
        };

        envioEmAndamento = true;

        botaoCriarPerfil.disabled = true;

        botaoCriarPerfil.textContent =
            "Criando perfil...";

        statusCadastro.textContent =
            "Preparando cadastro...";

        statusCadastro.className =
            "form-status cadastro-banda__status ativo carregando";

        console.log(
            "Dados da banda:",
            dadosBanda
        );

        setTimeout(() => {
            statusCadastro.textContent =
                "Perfil criado com sucesso!.";

            statusCadastro.className =
                "form-status cadastro-banda__status ativo sucesso";

            botaoCriarPerfil.textContent =
                "Cadastro validado";
        }, 500);
    }
);