document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "a2201b6283cd10a3fe2594ae0470054b";
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

    async function buscarFilmes() {
        try {
            const resposta = await fetch(apiUrl);
            const dados = await resposta.json();
            mostrarFilmes(dados.results);
        } catch (erro) {
            console.error("Erro ao buscar filmes:", erro);
        }
    }

    function mostrarFilmes(filmes) {
        const container = document.querySelector(".grid-filmes");
        container.innerHTML = "";

        filmes.slice(0, 15).forEach(filme => {
            const div = document.createElement("div");
            div.classList.add("filme");
            div.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.title}">
                <p>${filme.title}</p>
            `;
            container.appendChild(div);
        });
    }

    buscarFilmes();


});