import { getPopularMovies, getTopRatedMovies } from "./js/api.js";
import { createMovieCard, renderCards } from "./js/render.js";



// console.log(getPopularMovies());




const init = async () => {
    const popular = await getPopularMovies();
    renderCards(popular.results.slice(0, 10), '#popular-list');
    const topRated = await getTopRatedMovies();
    renderCards(topRated.results.slice(0, 10), '#top-rated-list');
}

init();
    
