const tmdbKey = '575311c7f5c556c1e5f2104eb89e5343';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = '?api_key=' + tmdbKey;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch);
    if(response.ok){
      jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
    throw new Error('request Failed!');
  } catch (error){
    console.log(error)
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const pageNumber = Math.floor(Math.random()*100);
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${pageNumber}`;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      const movies = jsonResponse['results'];
      return movies;
    }
    throw new Error('request Failed!');
  } catch(error){
    console.log(error);
  }
};
getMovies();
const getMovieInfo = async (movie) => {
  const movieId = movie['id'];
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = '?api_key=' + tmdbKey;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      movieInfo = await response.json();
      return movieInfo;
    }
    throw new Error('request failed!');
  } catch(error){
    console.log(error)
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie =  getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;