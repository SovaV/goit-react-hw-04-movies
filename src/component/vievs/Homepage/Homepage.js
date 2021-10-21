import { useState, useEffect } from 'react';
import { fetchTrending } from '../../services/Film-api';

export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrending()
      .then(request => setFilms(request.results))
      .catch(err => {
        setError(err);
      });
  }, []);

  return (
    <>
      <div>
        <h2>Trending today</h2>
        <ul>
          {films.map(film => (
            <li key={film.id}>
              <p>{film.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
