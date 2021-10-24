import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  useRouteMatch,
  Route,
  NavLink,
  // useHistory,
  useLocation,
  Link,
} from 'react-router-dom';

import Spiner from '../../Loader/Loader';
import * as fetchDetailsAPI from '../../services/Film-api';
import errorFilm from '../../img/no_poster.jpg';
import m from './Moviedetailspage.module.css';

const Reviews = lazy(() => import('./Reviews' /* webpackChunkName: "Reviews" */));
const Credits = lazy(() => import('./Credits' /* webpackChunkName: "Credits" */));

export default function Moviedetailspage() {
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  // const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    fetchDetailsAPI
      .fetchDetails(movieId)
      .then(response => setMovies(response))
      .catch(error => {
        setError(error);
      })
      .catch(error => setError(error));
  }, [movieId]);
  // const onGoBack = () => {
  //   history.push(location?.state?.from ?? '/movies');
  // };
  return (
    <>
      <Link to={location?.state?.from ?? '/movies'} className={m.btn}>
        ← Go Back
      </Link>

      {/* <button type="button" onClick={onGoBack}>
        ← Go Back
      </button> */}

      {movies && (
        <div className={m.box}>
          <img
            className={m.img}
            src={
              movies.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movies.poster_path}`
                : errorFilm
            }
            alt={movies.title}
            width="250"
          />
          <div>
            <h1>
              {movies.title} <span>({movies.release_date.slice(0, 4)})</span>
            </h1>
            <p>User Score: {movies.vote_average * 10}%</p>
            <b>Overview</b>
            <p>{movies.overview}</p>
            {movies.genres && (
              <div>
                <b>Genres</b>
                <ul className={m.genres__list}>
                  {movies.genres.map((item, index) => (
                    <li key={index} className={m.genres__item}>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      <p className={m.text}>Additional information</p>
      <div className={m.wapper}>
        <NavLink
          to={{
            pathname: `${url}/cast`,
            state: { from: location.state && location.state.from },
          }}
          className={m.link}
          activeClassName={m.activeLink}
        >
          Cast
        </NavLink>
        <NavLink
          to={{
            pathname: `${url}/reviews`,
            state: { from: location.state && location.state.from },
          }}
          className={m.link}
          activeClassName={m.activeLink}
        >
          Reviews
        </NavLink>

        <Suspense fallback={<Spiner />}>
          <Route exact path={`${path}:movieId/cast`}>
            <Credits movieId={movieId} />
          </Route>
          <Route exact path={`${path}:movieId/reviews`}>
            <Reviews movieId={movieId} />
          </Route>
        </Suspense>
      </div>
    </>
  );
}
