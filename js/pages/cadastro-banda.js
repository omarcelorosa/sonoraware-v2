const campoCep = document.getElementById("cep");
const campoCidade = document.getElementById("cidade");
const campoEstado = document.getElementById("estado");
const statusCep = document.getElementById("status-cep");

const campoSenha = document.getElementById("senha");
const campoConfirmarSenha = document.getElementById("confirmar-senha");
const statusSenha = document.getElementById("status-senha");

const campoTelefone = document.getElementById("responsavel-telefone");

const campoInstagram = document.getElementById("instagram");
const campoYoutube = document.getElementById("youtube");

const campoImagem = document.getElementById("foto-banda");
const statusImagem = document.getElementById("status-imagem");

const estilosMusicais = document.querySelectorAll(
    'input[name="estilos"]'
);

const statusEstilos = document.getElementById(
    "status-estilos"
);

const opcoesInstrumentos = document.querySelectorAll(
    'input[name="instrumentosProprios"]'
);

const campoInstrumentos = document.getElementById(
    "instrumentos"
);

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

    statusCep.className =
        "form-status ativo";

    statusCep.classList.add(tipo);
}


function limparStatusCep() {
    statusCep.textContent = "";

    statusCep.className =
        "form-status";

    campoCep.classList.remove(
        "campo-erro",
        "campo-sucesso"
    );
}


function mostrarErroCep(texto) {
    mostrarStatusCep(
        texto,
        "erro"
    );

    campoCep.classList.add(
        "campo-erro"
    );

    campoCep.classList.remove(
        "campo-sucesso"
    );
}


function mostrarCepValido() {
    mostrarStatusCep(
        "CEP encontrado.",
        "sucesso"
    );

    campoCep.classList.add(
        "campo-sucesso"
    );

    campoCep.classList.remove(
        "campo-erro"
    );
}


campoCep.addEventListener(
    "input",
    () => {
        let valor =
            campoCep.value;

        valor =
            valor.replace(
                /\D/g,
                ""
            );

        valor =
            valor.replace(
                /(\d{5})(\d)/,
                "$1-$2"
            );

        campoCep.value =
            valor;

        campoCidade.value = "";
        campoEstado.value = "";

        limparStatusCep();
    }
);


campoCep.addEventListener(
    "blur",
    async () => {
        const cep =
            campoCep.value.replace(
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
            const resposta =
                await fetch(
                    `https://viacep.com.br/ws/${cep}/json/`
                );

            if (!resposta.ok) {
                throw new Error(
                    "Erro na comunicação com o serviço de CEP."
                );
            }

            const dados =
                await resposta.json();

            if (dados.erro) {
                mostrarErroCep(
                    "CEP não encontrado."
                );

                campoCidade.value = "";
                campoEstado.value = "";

                return;
            }

            campoCidade.value =
                dados.localidade || "";

            campoEstado.value =
                dados.uf || "";

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
    }
);


function validarSenhas() {
    const senha =
        campoSenha.value;

    const confirmarSenha =
        campoConfirmarSenha.value;

    if (confirmarSenha.length === 0) {
        statusSenha.textContent = "";

        statusSenha.className =
            "form-status";

        campoSenha.classList.remove(
            "campo-erro"
        );

        campoConfirmarSenha.classList.remove(
            "campo-erro",
            "campo-sucesso"
        );

        return false;
    }

    if (senha.length < 8) {
        statusSenha.textContent =
            "A senha deve ter pelo menos 8 caracteres.";

        statusSenha.className =
            "form-status ativo erro";

        campoSenha.classList.add(
            "campo-erro"
        );

        campoConfirmarSenha.classList.remove(
            "campo-sucesso"
        );

        return false;
    }

    campoSenha.classList.remove(
        "campo-erro"
    );

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


campoTelefone.addEventListener(
    "input",
    () => {
        let valor =
            campoTelefone.value;

        valor =
            valor.replace(
                /\D/g,
                ""
            );

        valor =
            valor.substring(
                0,
                11
            );

        if (valor.length <= 2) {
            campoTelefone.value =
                valor;

            return;
        }

        if (valor.length <= 6) {
            campoTelefone.value =
                `(${valor.slice(0, 2)}) ${valor.slice(2)}`;

            return;
        }

        if (valor.length <= 10) {
            campoTelefone.value =
                `(${valor.slice(0, 2)}) ${valor.slice(2, 6)}-${valor.slice(6)}`;

            return;
        }

        campoTelefone.value =
            `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    }
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


function atualizarCampoInstrumentos() {
    const opcaoSelecionada =
        document.querySelector(
            'input[name="instrumentosProprios"]:checked'
        );

    if (!opcaoSelecionada) {
        campoInstrumentos.disabled =
            true;

        campoInstrumentos.required =
            false;

        campoInstrumentos.value =
            "";

        return;
    }

    if (
        opcaoSelecionada.value === "sim"
    ) {
        campoInstrumentos.disabled =
            false;

        campoInstrumentos.required =
            true;

        return;
    }

    campoInstrumentos.disabled =
        true;

    campoInstrumentos.required =
        false;

    campoInstrumentos.value =
        "";
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


function validarInstagram() {
    const valor =
        campoInstagram.value.trim();

    if (valor === "") {
        campoInstagram.classList.remove(
            "campo-erro",
            "campo-sucesso"
        );

        return true;
    }

    const regexInstagram =
        /^https:\/\/(www\.)?instagram\.com\/.+/i;

    if (
        !regexInstagram.test(valor)
    ) {
        campoInstagram.classList.add(
            "campo-erro"
        );

        campoInstagram.classList.remove(
            "campo-sucesso"
        );

        return false;
    }

    campoInstagram.classList.remove(
        "campo-erro"
    );

    campoInstagram.classList.add(
        "campo-sucesso"
    );

    return true;
}


function validarYoutube() {
    const valor =
        campoYoutube.value.trim();

    if (valor === "") {
        campoYoutube.classList.remove(
            "campo-erro",
            "campo-sucesso"
        );

        return true;
    }

    const regexYoutube =
        /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/i;

    if (
        !regexYoutube.test(valor)
    ) {
        campoYoutube.classList.add(
            "campo-erro"
        );

        campoYoutube.classList.remove(
            "campo-sucesso"
        );

        return false;
    }

    campoYoutube.classList.remove(
        "campo-erro"
    );

    campoYoutube.classList.add(
        "campo-sucesso"
    );

    return true;
}


campoInstagram.addEventListener(
    "blur",
    validarInstagram
);


campoYoutube.addEventListener(
    "blur",
    validarYoutube
);


function validarImagem() {
    const arquivo =
        campoImagem.files[0];

    if (!arquivo) {
        statusImagem.textContent = "";

        statusImagem.className =
            "form-status";

        campoImagem.classList.remove(
            "campo-erro",
            "campo-sucesso"
        );

        return true;
    }

    const tamanhoMaximo =
        5 * 1024 * 1024;

    const tiposPermitidos = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (
        !tiposPermitidos.includes(
            arquivo.type
        )
    ) {
        statusImagem.textContent =
            "Formato inválido. Use JPG, PNG ou WEBP.";

        statusImagem.className =
            "form-status ativo erro";

        campoImagem.classList.add(
            "campo-erro"
        );

        campoImagem.classList.remove(
            "campo-sucesso"
        );

        campoImagem.value = "";

        return false;
    }

    if (
        arquivo.size >
        tamanhoMaximo
    ) {
        statusImagem.textContent =
            "A imagem deve ter no máximo 5 MB.";

        statusImagem.className =
            "form-status ativo erro";

        campoImagem.classList.add(
            "campo-erro"
        );

        campoImagem.classList.remove(
            "campo-sucesso"
        );

        campoImagem.value = "";

        return false;
    }

    statusImagem.textContent =
        "Imagem válida.";

    statusImagem.className =
        "form-status ativo sucesso";

    campoImagem.classList.remove(
        "campo-erro"
    );

    campoImagem.classList.add(
        "campo-sucesso"
    );

    return true;
}


campoImagem.addEventListener(
    "change",
    validarImagem
);


formularioCadastroBanda.addEventListener(
    "submit",
    (evento) => {
        evento.preventDefault();

        if (envioEmAndamento) {
            return;
        }

        if (
            !formularioCadastroBanda.checkValidity()
        ) {
            formularioCadastroBanda.reportValidity();

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

        if (!validarInstagram()) {
            campoInstagram.focus();

            return;
        }

        if (!validarYoutube()) {
            campoYoutube.focus();

            return;
        }

        if (!validarImagem()) {
            campoImagem.focus();

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

        const anoFormacao =
            dadosFormulario.get(
                "anoFormacao"
            );

        const dadosBanda = {
            usuario:
                dadosFormulario.get(
                    "usuario"
                ).trim(),

            email:
                dadosFormulario.get(
                    "email"
                ).trim(),

            senha:
                dadosFormulario.get(
                    "senha"
                ),

            nomeBanda:
                dadosFormulario.get(
                    "nomeBanda"
                ).trim(),

            cep:
                dadosFormulario.get(
                    "cep"
                ),

            cidade:
                dadosFormulario.get(
                    "cidade"
                ).trim(),

            estado:
                dadosFormulario.get(
                    "estado"
                ).trim(),

            estilos:
                estilosSelecionados,

            numeroIntegrantes:
                Number(
                    dadosFormulario.get(
                        "numeroIntegrantes"
                    )
                ),

            anoFormacao:
                anoFormacao
                    ? Number(anoFormacao)
                    : null,

            responsavelNome:
                dadosFormulario.get(
                    "responsavelNome"
                ).trim(),

            responsavelFuncao:
                dadosFormulario.get(
                    "responsavelFuncao"
                ).trim(),

            responsavelTelefone:
                campoTelefone.value.replace(
                    /\D/g,
                    ""
                ),

            responsavelEmail:
                dadosFormulario.get(
                    "responsavelEmail"
                ).trim(),

            descricao:
                dadosFormulario.get(
                    "descricao"
                ).trim(),

            repertorio:
                dadosFormulario.get(
                    "repertorio"
                ).trim(),

            instrumentosProprios:
                dadosFormulario.get(
                    "instrumentosProprios"
                ),

            instrumentos:
                dadosFormulario.get(
                    "instrumentos"
                )
                    ? dadosFormulario.get(
                        "instrumentos"
                    ).trim()
                    : "",

            disponibilidade:
                dadosFormulario.get(
                    "disponibilidade"
                ),

            instagram:
                dadosFormulario.get(
                    "instagram"
                ).trim(),

            youtube:
                dadosFormulario.get(
                    "youtube"
                ).trim()
        };

        envioEmAndamento =
            true;

        botaoCriarPerfil.disabled =
            true;

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

        setTimeout(
            () => {
                statusCadastro.textContent =
                    "Cadastro validado. Pronto para integração com o backend.";

                statusCadastro.className =
                    "form-status cadastro-banda__status ativo sucesso";

                botaoCriarPerfil.textContent =
                    "Cadastro validado";
            },
            500
        );
    }
);