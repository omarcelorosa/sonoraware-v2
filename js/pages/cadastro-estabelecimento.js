const campoCep = document.getElementById("cep");
const campoCidade = document.getElementById("cidade");
const campoEstado = document.getElementById("estado");
const campoBairro = document.getElementById("bairro");
const campoLogradouro = document.getElementById("logradouro");
const statusCep = document.getElementById("status-cep");

const campoSenha = document.getElementById("senha");
const campoConfirmarSenha = document.getElementById("confirmar-senha");
const statusSenha = document.getElementById("status-senha");

const campoTelefone = document.getElementById("responsavel-telefone");

const campoInstagram = document.getElementById("instagram");
const campoSite = document.getElementById("site");

const campoImagem = document.getElementById(
    "foto-estabelecimento"
);

const statusImagem = document.getElementById(
    "status-imagem"
);

const tiposEvento = document.querySelectorAll(
    'input[name="tiposEvento"]'
);

const statusEventos = document.getElementById(
    "status-eventos"
);

const estruturas = document.querySelectorAll(
    'input[name="estrutura"]'
);

const acessibilidades = document.querySelectorAll(
    'input[name="acessibilidade"]'
);

const formularioCadastroEstabelecimento =
    document.getElementById(
        "form-cadastro-estabelecimento"
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
        let valor = campoCep.value;

        valor = valor.replace(
            /\D/g,
            ""
        );

        valor = valor.replace(
            /(\d{5})(\d)/,
            "$1-$2"
        );

        campoCep.value = valor;

        campoCidade.value = "";
        campoEstado.value = "";
        campoBairro.value = "";
        campoLogradouro.value = "";

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
            campoBairro.value = "";
            campoLogradouro.value = "";

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
                campoBairro.value = "";
                campoLogradouro.value = "";

                return;
            }

            campoCidade.value =
                dados.localidade || "";

            campoEstado.value =
                dados.uf || "";

            campoBairro.value =
                dados.bairro || "";

            campoLogradouro.value =
                dados.logradouro || "";

            mostrarCepValido();

        } catch (erro) {
            campoCidade.value = "";
            campoEstado.value = "";
            campoBairro.value = "";
            campoLogradouro.value = "";

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


function validarSite() {
    const valor =
        campoSite.value.trim();

    if (valor === "") {
        campoSite.classList.remove(
            "campo-erro",
            "campo-sucesso"
        );

        return true;
    }

    try {
        const url =
            new URL(valor);

        if (
            url.protocol !== "http:" &&
            url.protocol !== "https:"
        ) {
            throw new Error();
        }

        campoSite.classList.remove(
            "campo-erro"
        );

        campoSite.classList.add(
            "campo-sucesso"
        );

        return true;

    } catch {
        campoSite.classList.add(
            "campo-erro"
        );

        campoSite.classList.remove(
            "campo-sucesso"
        );

        return false;
    }
}


campoInstagram.addEventListener(
    "blur",
    validarInstagram
);


campoSite.addEventListener(
    "blur",
    validarSite
);


function validarTiposEvento() {
    const algumSelecionado =
        Array.from(
            tiposEvento
        ).some(
            tipo =>
                tipo.checked
        );

    if (!algumSelecionado) {
        statusEventos.textContent =
            "Selecione pelo menos um tipo de evento.";

        statusEventos.className =
            "form-status ativo erro";

        return false;
    }

    statusEventos.textContent = "";

    statusEventos.className =
        "form-status";

    return true;
}


tiposEvento.forEach(
    (tipo) => {
        tipo.addEventListener(
            "change",
            () => {
                if (tipo.checked) {
                    statusEventos.textContent =
                        "";

                    statusEventos.className =
                        "form-status";
                }
            }
        );
    }
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


formularioCadastroEstabelecimento.addEventListener(
    "submit",
    (evento) => {
        evento.preventDefault();

        if (envioEmAndamento) {
            return;
        }

        if (
            !formularioCadastroEstabelecimento.checkValidity()
        ) {
            formularioCadastroEstabelecimento.reportValidity();

            return;
        }

        if (!validarSenhas()) {
            campoConfirmarSenha.focus();

            return;
        }

        if (!validarInstagram()) {
            campoInstagram.focus();

            return;
        }

        if (!validarSite()) {
            campoSite.focus();

            return;
        }

        if (!validarImagem()) {
            campoImagem.focus();

            return;
        }

        if (!validarTiposEvento()) {
            const primeiroTipoEvento =
                document.querySelector(
                    'input[name="tiposEvento"]'
                );

            const secaoEventos =
                primeiroTipoEvento.closest(
                    ".form-secao"
                );

            secaoEventos.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }

        const dadosFormulario =
            new FormData(
                formularioCadastroEstabelecimento
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

        const tiposEventoSelecionados =
            Array.from(
                tiposEvento
            )
                .filter(
                    tipo =>
                        tipo.checked
                )
                .map(
                    tipo =>
                        tipo.value
                );

        const acessibilidadesSelecionadas =
            Array.from(
                acessibilidades
            )
                .filter(
                    item =>
                        item.checked
                )
                .map(
                    item =>
                        item.value
                );

        const dadosEstabelecimento = {
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

            nomeEstabelecimento:
                dadosFormulario.get(
                    "nomeEstabelecimento"
                ).trim(),

            tipoEstabelecimento:
                dadosFormulario.get(
                    "tipoEstabelecimento"
                ),

            descricao:
                dadosFormulario.get(
                    "descricao"
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

            bairro:
                dadosFormulario.get(
                    "bairro"
                ).trim(),

            logradouro:
                dadosFormulario.get(
                    "logradouro"
                ).trim(),

            numero:
                dadosFormulario.get(
                    "numero"
                ).trim(),

            complemento:
                dadosFormulario.get(
                    "complemento"
                ).trim(),

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

            capacidade:
                Number(
                    dadosFormulario.get(
                        "capacidade"
                    )
                ),

            tipoAmbiente:
                dadosFormulario.get(
                    "tipoAmbiente"
                ),

            estrutura:
                estruturasSelecionadas,

            acessibilidade:
                acessibilidadesSelecionadas,

            tiposEvento:
                tiposEventoSelecionados,

            instagram:
                dadosFormulario.get(
                    "instagram"
                ).trim(),

            site:
                dadosFormulario.get(
                    "site"
                ).trim()
        };

        envioEmAndamento = true;

        botaoCriarPerfil.disabled =
            true;

        botaoCriarPerfil.textContent =
            "Criando perfil...";

        statusCadastro.textContent =
            "Preparando cadastro...";

        statusCadastro.className =
            "form-status cadastro-estabelecimento__status ativo carregando";

        console.log(
            "Dados do estabelecimento:",
            dadosEstabelecimento
        );

        setTimeout(
            () => {
                statusCadastro.textContent =
                    "Cadastro validado. Pronto para integração com o backend.";

                statusCadastro.className =
                    "form-status cadastro-estabelecimento__status ativo sucesso";

                botaoCriarPerfil.textContent =
                    "Cadastro validado";
            },
            500
        );
    }
);