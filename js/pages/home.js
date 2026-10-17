function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}


function iniciarBuscaHome() {

    const campoBusca = document.querySelector(".header__search input");

    if (!campoBusca) {
        return;
    }

    if (campoBusca.dataset.buscaInicializada === "true") {
        return;
    }

    campoBusca.dataset.buscaInicializada = "true";


    const oportunidades = document.querySelectorAll(".oportunidade-home-card");
    const bandas = document.querySelectorAll(".banda-home-card");


    campoBusca.addEventListener("input", () => {

        const termo = normalizarTexto(campoBusca.value);


        oportunidades.forEach(card => {

            const conteudoCard = normalizarTexto(card.textContent);

            if (conteudoCard.includes(termo)) {
                card.removeAttribute("hidden");
            } else {
                card.setAttribute("hidden", "");
            }

        });


        bandas.forEach(card => {

            const conteudoCard = normalizarTexto(card.textContent);

            if (conteudoCard.includes(termo)) {
                card.removeAttribute("hidden");
            } else {
                card.setAttribute("hidden", "");
            }

        });

    });

}


document.addEventListener("headerCarregado", iniciarBuscaHome);

iniciarBuscaHome();