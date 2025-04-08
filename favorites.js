document.addEventListener('DOMContentLoaded', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesDiv = document.getElementById('favorites');

    if (favorites.length === 0) {
        favoritesDiv.innerHTML = `
        <div class="aviso-favoritos">
            <h2>Você não possui nenhum filme salvo...</h2>
            <a href="ratings.html">ver filmes</a>
        </div>
    `;
        return;
    }

    favorites.forEach(movie => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="grid-filmes-recommendations">
                <div class="filme-recommendations">
                    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" class='img-recommendations'>
                </div>
                <p class="p-recommendations">${movie.title}</p>
                <div class="button-container">
                    <button class="button-recommendations-red">
                        <a href="https://youtube.com/results?search_query=${encodeURIComponent(movie.title)}" target="_blank">Trailer</a>
                    </button>
                    <button class="button-recommendations remove-button" data-id="${movie.id}">Remover</button>
                </div>
            </div>
        `;
        favoritesDiv.appendChild(div);
    });

    // Evento para remover filmes dos favoritos
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const movieId = event.target.getAttribute('data-id');
            removeFromFavorites(movieId);
        });
    });
});

function removeFromFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(movie => movie.id !== parseInt(movieId));
    localStorage.setItem('favorites', JSON.stringify(favorites));
    location.reload(); // Atualiza a página para refletir a mudança
}