const formularioIntegrante = document.getElementById("form-cadastro-integrante");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmar-senha");
const telefone = document.getElementById("telefone");
const foto = document.getElementById("foto-perfil");
const statusSenha = document.getElementById("status-senha");
const statusImagem = document.getElementById("status-imagem");
const statusCadastro = document.getElementById("status-cadastro");

function validarSenhas() {
    const divergentes = confirmarSenha.value !== "" && senha.value !== confirmarSenha.value;
    const mensagem = divergentes ? "As senhas não coincidem." : "";
    confirmarSenha.setCustomValidity(mensagem);
    statusSenha.textContent = mensagem;
    statusSenha.className = divergentes ? "form-status ativo erro" : "form-status";
}

senha.addEventListener("input", validarSenhas);
confirmarSenha.addEventListener("input", validarSenhas);

telefone.addEventListener("input", () => {
    const numeros = telefone.value.replace(/\D/g, "").slice(0, 11);
    if (numeros.length <= 2) {
        telefone.value = numeros;
    } else if (numeros.length <= 6) {
        telefone.value = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    } else {
        const corte = numeros.length <= 10 ? 6 : 7;
        telefone.value = `(${numeros.slice(0, 2)}) ${numeros.slice(2, corte)}-${numeros.slice(corte)}`;
    }
});

function validarFoto() {
    const arquivo = foto.files[0];
    let mensagem = "";
    if (arquivo && !["image/jpeg", "image/png", "image/webp"].includes(arquivo.type)) {
        mensagem = "Formato inválido. Use JPG, PNG ou WEBP.";
    } else if (arquivo && arquivo.size > 5 * 1024 * 1024) {
        mensagem = "A imagem deve ter no máximo 5 MB.";
    }
    foto.setCustomValidity(mensagem);
    statusImagem.textContent = mensagem;
    statusImagem.className = mensagem ? "form-status ativo erro" : "form-status";
}

foto.addEventListener("change", validarFoto);

formularioIntegrante.addEventListener("input", () => {
    statusCadastro.textContent = "";
    statusCadastro.className = "form-status cadastro-banda__status";
});

formularioIntegrante.addEventListener("submit", (evento) => {
    evento.preventDefault();
    validarSenhas();
    validarFoto();
    if (!formularioIntegrante.reportValidity()) return;

    // Frontend validation only, matching the current band registration flow.
    // The backend must hash the password, upload the photo, and resolve instrument
    // names to Instrumento IDs before inserting integrante_instrumento records.
    statusCadastro.textContent = "Dados validados. O cadastro ainda não foi salvo.";
    statusCadastro.className = "form-status cadastro-banda__status ativo sucesso";
});
