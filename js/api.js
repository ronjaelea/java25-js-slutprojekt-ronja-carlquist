import { BEARER_TOKEN } from "./config.js";
import { BASE_URL } from "./config.js";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BEARER_TOKEN}`
  }
}

export const getPopularMovies = async () => {
    const response = await fetch(BASE_URL + '/movie/popular', options);
    const data = await response.json();
    return data;
}

export const getTopRatedMovies = async () => {
    const response = await fetch(BASE_URL + '/movie/top_rated', options);
    const data = await response.json();
    return data;
}

export const searchMovies = async (query) => {
    const response = await fetch(BASE_URL + `/search/movie?query=${encodeURIComponent(query)}`, options);
    const data = await response.json();
    return data;
}

export const searchPersons = async (query) => {
    const response = await fetch(BASE_URL + `/search/person?query=${encodeURIComponent(query)}`, options);
    const data = await response.json();
    return data;
}