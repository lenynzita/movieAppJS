//API url for the movies + the key sorted by popularity
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0e2b5ba30623f3876c47333664b907fb&page=1";

//https://developers.themoviedb.org/3/getting-started/images
//the link of api image
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

//to find the information on the search bar
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=0e2b5ba30623f3876c47333664b907fb&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}
//This function will help us to show the movie 
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    //HTML Syntacs
    movieEl.innerHTML = `
            
             <img src="${IMG_PATH + poster_path}" alt="${title}">
             <div class="movie-info">
                 <h3>${title}</h3>
                 <span class="${getClassByRate(
                   vote_average
                 )}">${vote_average}</span>
             </div>
             <div class="overview">
                 <h3>Overview</h3>
                 ${overview}
             </div>
        
    `;

    main.appendChild(movieEl);
  });
}
//the color of the movie will be decide be the rating of the movie.
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); //so that it doesnt submit to the page

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
