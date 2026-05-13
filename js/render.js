import { IMAGE_BASE_URL } from "./config.js";


export const createMovieCard = (movie) => {
    const card = document.createElement('div');
    // card.className = css-regel för card

    const poster = document.createElement('img');
    poster.src = `${IMAGE_BASE_URL}${movie.poster_path}`
    
    const title = document.createElement('h3');
    title.textContent = movie.title;

    const releaseDate = document.createElement('p');
    releaseDate.textContent = `Release date: ${movie.release_date}`;

    const rating = document.createElement('p');
    rating.textContent = `Average score: ${movie.vote_average} / 10`;

    // beskrivning, endast vid sökresultat
    // if (isSearchResult...) {
    //     const info = ...
    //     info.textContent...
    // }

    card.append(poster, title, releaseDate, rating);
    return card;
};


export const createPersonCard = (person) => {
    
};

export const renderCards = (movies, list) => {
    console.log(movies);
    const container = document.querySelector(list)
    movies.forEach(movie => {
        const card = createMovieCard(movie);
        container.append(card);
    });

}

