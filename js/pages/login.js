const senha = document.getElementById("senha");
const botaoMostrarSenha = document.getElementById("mostrar-senha");

botaoMostrarSenha.addEventListener("click", () => {
    if (senha.type === "password") {
        senha.type = "text";
    } else {
        senha.type = "password";
    }
});