const apiKey = 'a2201b6283cd10a3fe2594ae0470054b';
let selectedItems = [];

document.addEventListener('DOMContentLoaded', () => {
    const movieSeriesListElement = document.getElementById('movie-series-list');
    if (movieSeriesListElement) {
        fetchMoviesAndSeries();
    } else {
        console.error('Elemento #movie-series-list não encontrado.');
    }
});

async function fetchMoviesAndSeries() {
    try {
        let allItems = [];

        for (let page = 1; page <= 3; page++) {
            const movieResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc&primary_release_date.gte=2010-01-01&primary_release_date.lte=2020-12-31&page=${page}`);
            const movieData = await movieResponse.json();

            const seriesResponse = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc&first_air_date.gte=2010-01-01&first_air_date.lte=2020-12-31&page=${page}`);
            const seriesData = await seriesResponse.json();

            allItems = [...allItems, ...movieData.results, ...seriesData.results];
        }

        displayItems(allItems);
    } catch (error) {
        console.error("Erro ao buscar filmes e séries:", error);
    }
}

function displayItems(items) {
    const movieSeriesListElement = document.getElementById('movie-series-list');
    movieSeriesListElement.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => toggleSelection(item));

        const image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/w200${item.poster_path}`;
        image.alt = item.title || item.name;

        const titleElement = document.createElement('p');
        titleElement.textContent = item.title || item.name;

        card.appendChild(checkbox);
        card.appendChild(image);
        card.appendChild(titleElement);

        movieSeriesListElement.appendChild(card);
    });
}

function toggleSelection(item) {
    const index = selectedItems.findIndex(selected => selected.id === item.id);

    if (index === -1 && selectedItems.length < 10) {
        selectedItems.push({ id: item.id, title: item.title || item.name });
    } else {
        selectedItems = selectedItems.filter(selected => selected.id !== item.id);
    }
    console.log("Itens selecionados:", selectedItems);
}

function recomendarFilmes() {
    if (selectedItems.length === 0) {
        alert('Selecione 1 Item!');
        return;
    }

    localStorage.setItem('selectedMovies', JSON.stringify(selectedItems));
    window.location.href = 'recomendacoes.html';
}