import { useState, useEffect } from 'react';
import { fetchTrending } from '../../services/Film-api';
import { Link, useRouteMatch } from 'react-router-dom';

const Status = {
  IDLE: 'idle', // стоїть на місці
  PENDING: 'pending', // очікується
  RESOLVED: 'resolved', // виконалось
  REJECTED: 'rejected', // відхилено
};

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const { url } = useRouteMatch();
  useEffect(() => {
    fetchTrending()
      .then(prevState => setMovies(prevState.results))
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, []);

  return (
    <>
      {status === Status.IDLE && (
        <>
          <h2>Trending today</h2>
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link to={`${url}movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
