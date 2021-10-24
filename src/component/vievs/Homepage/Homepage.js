import { useState, useEffect } from 'react';
import { fetchTrending } from '../../services/Film-api';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const { url } = useRouteMatch();
  const location = useLocation();
  console.log('HomePage:', location);
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
        <>
          <h2>Trending today</h2>
          <ul>
            {movies.map(({ title, id }) => (
              <li key={id}>
                <Link
                  to={{
                    pathname: `${url}movies/${id}`,
                    state: { from: location },
                  }}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
