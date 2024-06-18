document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".navbar a");
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const pagina = this.getAttribute("data-page");
            carregarPagina(pagina);
        });
    });

    function carregarPagina(pagina) {
        fetch(pagina)
            .then(resposta => resposta.text())
            .then(dados => {
                document.querySelector(".main-content").innerHTML = dados;
            })
            .catch(erro => console.error("Erro ao carregar a página:", erro));
    }

    // Carregar página inicial (opcional)
    carregarPagina("pages/home.html");
});
