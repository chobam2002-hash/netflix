const API_KEY = "af980a07b624bd77859bc078381cf2a3";
const API_URL = "https://api.themoviedb.org/3/movie/now_playing";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const movieGrid = document.getElementById("movieGrid");
const statusText = document.getElementById("status");

async function fetchNowPlayingMovies() {
  try {
    const url = `${API_URL}?api_key=${API_KEY}&language=en-US&page=1`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const movies = data.results || [];

    if (movies.length === 0) {
      statusText.textContent = "No movies to display.";
      return;
    }

    statusText.textContent = `Found ${movies.length} movies.`;
    renderMovies(movies);
  } catch (error) {
    statusText.textContent = "Failed to load movie data.";
    console.error(error);
  }
}

function renderMovies(movies) {
  movieGrid.innerHTML = "";

  for (const movie of movies) {
    const card = document.createElement("article");
    card.className = "movie-card";

    const poster = document.createElement("img");
    poster.className = "movie-poster";
    poster.alt = `${movie.title} poster`;
    poster.src = movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image";

    const title = document.createElement("h3");
    title.className = "movie-title";
    title.textContent = movie.title;

    const releaseDate = document.createElement("p");
    releaseDate.className = "movie-release-date";
    releaseDate.textContent = movie.release_date
      ? `Release date: ${movie.release_date}`
      : "Release date: Unknown";

    card.appendChild(poster);
    card.appendChild(title);
    card.appendChild(releaseDate);
    movieGrid.appendChild(card);
  }
}

fetchNowPlayingMovies();
