import { getPopularMovies, getTopRatedMovies } from "./js/api.js";
import { renderCards } from "./js/render.js";


const init = async () => {
    const popular = await getPopularMovies();
    renderCards(popular.results.slice(0, 10), '#popular-list');
    const topRated = await getTopRatedMovies();
    renderCards(topRated.results.slice(0, 10), '#top-rated-list');
}

init();