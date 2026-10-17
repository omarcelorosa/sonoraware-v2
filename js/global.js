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

        const loginButton = document.getElementById("login-button");
        const loginMenu = document.getElementById("login-menu");

        if (loginButton && loginMenu) {
            loginButton.addEventListener("click", () => {
                loginMenu.classList.toggle("ativo");
            });
        }

        document.dispatchEvent(new Event("headerCarregado"));
    })
    .catch(error => {
        console.error("Erro ao carregar o header:", error);
    });