import { useState, useEffect } from 'react';
import * as fetchFilmsErrorHandling from '../../services/Film-api';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import useStyles from '../../Pagination/styleP';
import errorFilm from '../../img/no_poster.jpg';
import Spiner from '../../Loader/Loader';
import h from './Homepage.module.css';
const Status = {
  IDLE: 'idle', // стоїть на місці
  PENDING: 'pending', // очікується
  RESOLVED: 'resolved', // виконалось
  REJECTED: 'rejected', // відхилено
};
export default function HomePage() {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const { url } = useRouteMatch();
  const location = useLocation();
  const [totalPage, setTotalPage] = useState(0);
  const history = useHistory();
  const [status, setStatus] = useState(Status.IDLE);
  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    setStatus(Status.PENDING);
    fetchFilmsErrorHandling
      .fetchTrending(page)
      .then(({ results, total_pages }) => {
        setMovies(results);
        setTotalPage(total_pages);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [page]);

  const onHandlePage = (event, page) => {
    history.push({ ...location, search: `page=${page}` });
  };
  return (
    <>
      <div>
        {status === Status.PENDING && <Spiner />}
        <h2 className={h.title}>Trending today</h2>
        {status === Status.RESOLVED && (
          <>
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
                      src={
                        poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : errorFilm
                      }
                      alt={title}
                    />
                    <p className={h.text}>{title}</p>
                  </Link>
                </li>
              ))}
            </ul>
            {totalPage > 1 && (
              <Pagination
                className={classes.root}
                count={totalPage}
                onChange={onHandlePage}
                page={Number(page)}
                showFirstButton
                showLastButton
                size="large"
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
