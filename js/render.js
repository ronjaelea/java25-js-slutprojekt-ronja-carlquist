import { IMAGE_BASE_URL } from "./config.js";


const createMovieCard = (movie) => {
    const card = document.createElement('div');
    card.className = 'card';

    const poster = document.createElement('img');
    poster.src = `${IMAGE_BASE_URL}${movie.poster_path}`;
    
    const title = document.createElement('h3');
    title.textContent = movie.title;
    title.className = 'card-title';

    const releaseDate = document.createElement('p');
    releaseDate.textContent = `Release date: ${movie.release_date}`;

    const rating = document.createElement('p');
    rating.textContent = `Average score: ${movie.vote_average.toFixed(1)} / 10`;

    // delar upp i divar för att få bra layout med flex
    const upper = document.createElement('div');
    const lower = document.createElement('div');

    upper.append(poster, title);
    lower.append(releaseDate, rating);
    card.append(upper, lower);
    return card;
}

export const renderCards = (movies, list) => {
    const container = document.querySelector(list)
    movies.forEach(movie => {
        const card = createMovieCard(movie);
        container.append(card);
    });
}

const searchResultMovie = (movie) => {
    const result = document.createElement('div');
    result.className = 'search-result';

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const poster = document.createElement('img');
    poster.src = `${IMAGE_BASE_URL}${movie.poster_path}`

    const overview = document.createElement('p');
    overview.textContent = movie.overview;

    const releaseDate = document.createElement('p');
    releaseDate.textContent = `Release date: ${movie.release_date}`;
    
    const rating = document.createElement('p');
    rating.textContent = `Average score: ${movie.vote_average.toFixed(1)} / 10`;

    // delar upp i divar för att få bra layout med flex
    const contents = document.createElement('div');
    contents.className = 'result-contents';

    const details = document.createElement('div');

    const info = document.createElement('div');
    info.className = 'result-info';

    details.append(releaseDate, rating);
    info.append(overview, details);
    contents.append(poster, info);
    result.append(title, contents);
    return result;
}

const searchResultPerson = (person) => {
    const result = document.createElement('div');
    result.className = 'search-result';

    const name = document.createElement('h2');
    name.textContent = person.name;

    const department = document.createElement('h3');
    department.textContent = person.known_for_department;

    const photo = document.createElement('img');
    photo.src = `${IMAGE_BASE_URL}${person.profile_path}`;

    const knownFor = document.createElement('ul');
    knownFor.innerText = 'Known for:';
    person.known_for.forEach(item => {
        const li = document.createElement('li');
        // för filmer är det title, för tv-serier är det name
        li.textContent = `• ${item.title || item.name} (${item.media_type})`;
        knownFor.append(li);
    });
    
    const popularity = document.createElement('p');
    popularity.textContent = `Popularity: ${person.popularity.toFixed(1)}`;
    
    const contents = document.createElement('div');
    contents.className = 'result-contents';

    const info = document.createElement('div');
    info.className = 'result-info';

    // delar upp i divar för att få bra layout med flex
    info.append(knownFor, popularity);
    contents.append(photo, info);
    result.append(name, department, contents);
    return result;
}

export const renderSearchResults = (results, query, category) => {
    const container = document.querySelector('#result-container');
    container.innerHTML = ''; // rensa containern vid varje sökning

    if (!results || results.length === 0) {
        const msg = document.createElement('p');
        msg.textContent = `No results found for "${query}"`;
        container.append(msg);
        return;
    }

    const msg = document.createElement('h3');
    msg.textContent = `Results for "${query}"`;
    container.append(msg);

    results.forEach(item => {
        const result = category === 'persons' ? searchResultPerson(item) : searchResultMovie(item);
        result.className = 'result';
        container.append(result);
    });
}