import { renderSearchResults } from "./render.js";
import { searchMovies, searchPersons } from "./api.js";

const form = document.querySelector('.search-form');
const queryInput = document.querySelector('#search-query');
const sortSelect = document.querySelector('#sort-select');


/* results, query & category behöver hållas globalt för att kunna användas av eventlistener på sortSelect
 * så att vi kan ändra sorteringen på aktuella resultat utan ny API-request */
let currentResults = [];
let currentQuery = '';
let currentCategory = 'movies';

/* eftersom fältet vi ska sortera på heter title för filmer och name för personer
 * behöves en nyckel att sortera på beroende på kategori */
const nameKey = (category) => category === 'persons' ? 'name' : 'title';

const sortResults = (results, sortValue, category) => {
    const sorted = [...results];
    const key = nameKey(category);
    if (sortValue === 'az') sorted.sort((a, b) => a[key].localeCompare(b[key]));
    if (sortValue === 'za') sorted.sort((a, b) => b[key].localeCompare(a[key]));
    if (sortValue === 'pop-high') sorted.sort((a, b) => b.popularity - a.popularity);
    if (sortValue === 'pop-low') sorted.sort((a, b) => a.popularity - b.popularity);
    return sorted;
}

/* beroende på vilken html-sida sökningen görs från kommer argumenten från
 * url:en eller direkt från formuläret via eventlistener */
const performSearch = async (query, category) => {
    const data = category === 'persons' ? await searchPersons(query) : await searchMovies(query);
    // uppdatera de globala variablerna med aktuell användarinput och sökresultat
    currentResults = data.results;
    currentQuery = query;
    currentCategory = category;
    // sorted är den sorterade arrayen av sökresultatet och skickas som argument till parametern "results" i renderSearchResults
    const sorted = sortResults(currentResults, sortSelect.value, currentCategory);
    renderSearchResults(sorted, currentQuery, currentCategory);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = queryInput.value.trim();
    const categoryRadio = document.querySelector('input[name="category"]:checked');
    const category = categoryRadio ? categoryRadio.value : 'movies'; // movies är checked som default i HTML, men har med det här för säkerhets skull
    if (query) performSearch(query, category);
});

sortSelect.addEventListener('change', () => {
    if (!currentResults.length) return; // anropa inte sort eller render om currentResults är tom
    const sorted = sortResults(currentResults, sortSelect.value, currentCategory);
    renderSearchResults(sorted, currentQuery, currentCategory);
});

const params = new URLSearchParams(window.location.search);
const urlQuery = params.get('query');
const urlCategory = params.get('category') || 'movies';
const urlSort = params.get('sort') || '';

/* om query finns i url:en (dvs vid redirect från index.html)
 * fylls alla inputs i utifrån parametrarna och sökning körs automatiskt */
if (urlQuery) {
    queryInput.value = urlQuery;
    const radio = document.querySelector(`input[name="category"][value="${urlCategory}"]`);
    if (radio) radio.checked = true;
    sortSelect.value = urlSort;
    performSearch(urlQuery, urlCategory);
}