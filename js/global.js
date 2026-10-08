fetch("./components/header.html") /* busca um recurso */
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-container").innerHTML = data;
        const loginButton = document.getElementById("login-button");
        const loginMenu = document.getElementById("login-menu");
        loginButton.addEventListener("click", () => {
            loginMenu.classList.toggle("ativo");
        });
    }); 