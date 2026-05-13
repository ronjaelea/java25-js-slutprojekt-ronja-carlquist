import { BEARER_TOKEN } from "./config.js";
import { BASE_URL } from "./config.js";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BEARER_TOKEN}`
  }
}

// const fetchFromApi = (endpoint) => {
//   fetch(`${BASE_URL}${endpoint}`, options)
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.error(err));
//     // specificera fel om anv kan göra ngt åt det!
//     return data;
// }

export const getPopularMovies = async () => {
    const response = await fetch(BASE_URL + '/movie/popular', options);
    const data = await response.json();
    // console.log(data);
    return data;
}
// export const getPopularMovies = () => {
//     return fetchFromAPI('/movie/popular')
//         .then(data => data.results.slice(0, 10));
// };

export const getTopRatedMovies = async () => {
    const response = await fetch(BASE_URL + '/movie/top_rated', options);
    const data = await response.json();
    // console.log(data);
    return data;
}
// export const getTopRatedMovies = () => {
//     return fetchFromAPI('/movie/top_rated')
//         .then(data => data.results.slice(0, 10));
// };

export const searchMovies = async (query) => {
    const response = await fetch(BASE_URL + '/search/movie?query=${encodeURIComponent(query)}', options);
    const data = await response.json();
    // console.log(data);
    return data;
}
// export const searchMovies = (query) => {
//     return fetchFromAPI(`/search/movie?query=${encodeURIComponent(query)}`)
//         .then(data => data.results);
//         // slice(?) för att få första sidan JSON
// };

export const searchPersons = async (query) => {
    const response = await fetch(BASE_URL + '/search/person?query=${encodeURIComponent(query)}', options);
    const data = await response.json();
    // console.log(data);
    return data;
}
// export const searchPersons = (query) => {
//     return fetchFromAPI(`/search/person?query=${encodeURIComponent(query)}`)
//         .then(data => data.results);
//         // slice(?) för att få första sidan JSON
// };


// https://api.themoviedb.org/3/movie/popular

// https://api.themoviedb.org/3/movie/top_rated