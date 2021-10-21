const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '2fae17bbf67a54d6ff0d6a27cbde5c5e';

async function fetchFilmsErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok ? await response.json() : Promise.reject(new Error('Not found'));
}

export function fetchTrending() {
  return fetchFilmsErrorHandling(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
}

export function fetchMovies(name) {
  return fetchFilmsErrorHandling(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${name}`);
}

export function fetchDetails(movie_id) {
  return fetchFilmsErrorHandling(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`);
}

export function fetchCredits(movie_id) {
  return fetchFilmsErrorHandling(`${BASE_URL}/movie/${movie_id}/credits?api_key=${API_KEY}`);
}

export function fetchReviews(movie_id) {
  return fetchFilmsErrorHandling(`${BASE_URL}/movie/${movie_id}/reviews?api_key=${API_KEY}`);
}
