fetch("/components/header.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possível carregar o header.");
        }

        return response.text();
    })
    .then(data => {

        const headerContainer = document.getElementById("header-container");

        if (!headerContainer) {
            return;
        }

        headerContainer.innerHTML = data;

        definirPerfilAtual();
        configurarMenusPorPerfil();
        configurarDropdownsHeader();
        configurarMenuLogin();

        document.dispatchEvent(new Event("headerCarregado"));

    })
    .catch(error => {
        console.error("Erro ao carregar o header:", error);
    });


function definirPerfilAtual() {

    const caminho = window.location.pathname;


    const paginasBanda = [
        "/pages/banda/oportunidades.html",
        "/pages/banda/minhas-inscricoes.html"
    ];


    const paginasEstabelecimento = [
        "/pages/estabelecimento/criar-solicitacao.html",
        "/pages/estabelecimento/minhas-solicitacoes.html",
        "/pages/estabelecimento/inscricoes-recebidas.html"
    ];


    if (paginasBanda.includes(caminho)) {

        localStorage.setItem("perfilAtivo", "banda");
        return;

    }


    if (paginasEstabelecimento.includes(caminho)) {

        localStorage.setItem("perfilAtivo", "estabelecimento");
        return;

    }

}


function configurarMenusPorPerfil() {

    const perfil = localStorage.getItem("perfilAtivo");

    const solicitacoesMenu =
        document.getElementById("solicitacoes-menu");

    const eventosMenu =
        document.getElementById("eventos-menu");


    if (!solicitacoesMenu || !eventosMenu) {
        return;
    }


    if (perfil === "banda") {

        solicitacoesMenu.innerHTML = `
            <a href="/pages/banda/minhas-inscricoes.html">
                Minhas inscrições
            </a>
        `;


        eventosMenu.innerHTML = `
            <a href="/pages/banda/oportunidades.html">
                Oportunidades
            </a>
        `;

        return;

    }


    if (perfil === "estabelecimento") {

        solicitacoesMenu.innerHTML = `
            <a href="/pages/estabelecimento/criar-solicitacao.html">
                Criar solicitação
            </a>

            <a href="/pages/estabelecimento/minhas-solicitacoes.html">
                Minhas solicitações
            </a>

            <a href="/pages/estabelecimento/inscricoes-recebidas.html">
                Inscrições recebidas
            </a>
        `;


        eventosMenu.innerHTML = `
            <a href="/pages/banda/oportunidades.html">
                Oportunidades
            </a>
        `;

        return;

    }


    solicitacoesMenu.innerHTML = `
        <a href="/pages/auth/login.html">
            Entrar para acessar
        </a>
    `;


    eventosMenu.innerHTML = `
        <a href="/pages/banda/oportunidades.html">
            Oportunidades
        </a>
    `;

}


function configurarDropdownsHeader() {

    const solicitacoesButton =
        document.getElementById("solicitacoes-button");

    const solicitacoesMenu =
        document.getElementById("solicitacoes-menu");

    const eventosButton =
        document.getElementById("eventos-button");

    const eventosMenu =
        document.getElementById("eventos-menu");


    function fecharDropdowns() {

        solicitacoesMenu?.classList.remove("ativo");
        eventosMenu?.classList.remove("ativo");

        solicitacoesButton?.setAttribute(
            "aria-expanded",
            "false"
        );

        eventosButton?.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (solicitacoesButton && solicitacoesMenu) {

        solicitacoesButton.addEventListener("click", event => {

            event.stopPropagation();

            const aberto =
                solicitacoesMenu.classList.contains("ativo");

            fecharDropdowns();

            if (!aberto) {

                solicitacoesMenu.classList.add("ativo");

                solicitacoesButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    }


    if (eventosButton && eventosMenu) {

        eventosButton.addEventListener("click", event => {

            event.stopPropagation();

            const aberto =
                eventosMenu.classList.contains("ativo");

            fecharDropdowns();

            if (!aberto) {

                eventosMenu.classList.add("ativo");

                eventosButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    }


    solicitacoesMenu?.addEventListener("click", event => {
        event.stopPropagation();
    });


    eventosMenu?.addEventListener("click", event => {
        event.stopPropagation();
    });


    document.addEventListener("click", fecharDropdowns);

}


function configurarMenuLogin() {

    const loginButton =
        document.getElementById("login-button");

    const loginMenu =
        document.getElementById("login-menu");


    if (!loginButton || !loginMenu) {
        return;
    }


    loginButton.addEventListener("click", event => {

        event.stopPropagation();

        loginMenu.classList.toggle("ativo");

    });


    loginMenu.addEventListener("click", event => {
        event.stopPropagation();
    });


    document.addEventListener("click", () => {
        loginMenu.classList.remove("ativo");
    });

}