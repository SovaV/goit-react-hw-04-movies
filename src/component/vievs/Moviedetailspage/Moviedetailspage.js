import { useState, useEffect } from 'react';
import { useParams, useRouteMatch, Switch, Route, NavLink } from 'react-router-dom';
import Reviews from '../Reviews';
import Credits from '../Credits';
import * as fetchAPI from '../../services/Film-api';

export default function Moviedetailspage() {
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchAPI
      .fetchDetails(movieId)
      .then(prevState => setMovies(prevState))
      .catch(error => {
        setError(error);
      });
  }, [movieId]);

  return (
    <>
      <NavLink to={`${url}/cast`}>Cast</NavLink>

      <NavLink to={`${url}/reviews`}>Reviews</NavLink>
      <Switch>
        <Route path={`${path}:movieId/cast`}>
          <Credits />
        </Route>
        <Route path={`/movies/:movieId/reviews`}>{movies && <Reviews movies={movies} />}</Route>
      </Switch>
    </>
  );
}
