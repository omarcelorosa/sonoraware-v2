fetch("./components/header.html") /* busca um recurso*/
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-container").innerHTML = data;
    }); 