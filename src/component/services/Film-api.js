const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '2fae17bbf67a54d6ff0d6a27cbde5c5e';

async function fetchFilmsErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok ? await response.json() : Promise.reject(new Error('Not found'));
}

export function fetchTrending(page) {
  return fetchFilmsErrorHandling(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`);
}

export function fetchMovie(query, page) {
  return fetchFilmsErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
  );
}

export function fetchDetails(movieId) {
  return fetchFilmsErrorHandling(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
}

export function fetchCredits(movieId) {
  return fetchFilmsErrorHandling(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
}

export function fetchReviews(movieId) {
  return fetchFilmsErrorHandling(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
}
