const apiKey = 'a2201b6283cd10a3fe2594ae0470054b';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const selectedItems = JSON.parse(localStorage.getItem('selectedMovies')) || [];
        console.log("Filmes selecionados:", selectedItems);

        if (selectedItems.length === 0) {
            document.getElementById('recommendations').innerHTML = '<h2>Nenhum filme selecionado!</h2>';
            return;
        }

        const recommendedMovies = [];
        for (let item of selectedItems) {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${item.id}/recommendations?api_key=${apiKey}&language=pt-BR`);
            const data = await response.json();
            recommendedMovies.push(...data.results);
        }

        displayRecommendations(recommendedMovies);
    } catch (error) {
        console.error("Erro ao buscar recomendações:", error);
    }
});

function displayRecommendations(items) {
    const recommendationsDiv = document.getElementById('recommendations');

    items.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="grid-filmes-recommendations">
                <div class="filme-recommendations">
                    <img src="https://image.tmdb.org/t/p/w200${item.poster_path}" alt="${item.title}" class='img-recommendations'>
                </div>
                <p class="p-recommendations">${item.title}</p>
                <div class="button-container">
                    <button class="button-recommendations-red">
                        <a href="https://youtube.com/results?search_query=${encodeURIComponent(item.title)}" target="_blank">Trailer</a>
                    </button>
                    <button class="button-recommendations save-button" data-movie='${JSON.stringify(item)}'>Salvar</button>
                </div>
            </div>
        `;
        recommendationsDiv.appendChild(div);
    });

    // Adiciona eventos de clique aos botões "Salvar"
    document.querySelectorAll('.save-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const movie = JSON.parse(event.target.getAttribute('data-movie'));
            saveToFavorites(movie);
        });
    });
}

function saveToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Evita salvar duplicatas
    if (!favorites.some(fav => fav.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Filme salvo nos favoritos!');
    } else {
        alert('Esse filme já está nos favoritos.');
    }
}