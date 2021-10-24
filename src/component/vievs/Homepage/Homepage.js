import { useState, useEffect } from 'react';
import { fetchTrending } from '../../services/Film-api';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import errorFilm from '../../img/no_poster.jpg';
import h from './Homepage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const { url } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    fetchTrending()
      .then(prevState => setMovies(prevState.results))
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
    <>
      {movies && (
        <div>
          <h2>Trending today</h2>
          <ul className={h.list}>
            {movies.map(({ title, id, poster_path }) => (
              <li key={id} className={h.item}>
                <Link
                  to={{
                    pathname: `${url}movies/${id}`,
                    state: { from: location },
                  }}
                >
                  <img
                    className={h.img}
                    src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : errorFilm}
                    alt={title}
                  />
                  <p className={h.text}>{title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
