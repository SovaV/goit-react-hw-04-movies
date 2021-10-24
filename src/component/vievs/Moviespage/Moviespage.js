import { useState, useEffect } from 'react';
import { useHistory, useLocation, NavLink, useRouteMatch } from 'react-router-dom';
import * as fetchDetailsAPI from '../../services/Film-api';
import Searchbar from '../../Searchbar/Searchbar';

export default function Moviespage() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState();
  // const [status, setStatus] = useState(Status.IDLE);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const searchName = new URLSearchParams(location.search).get('name') ?? '';

  useEffect(() => {
    if (!searchName) {
      return;
    }

    fetchDetailsAPI
      .fetchMovie(searchName)
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        setError(error);
      });
  }, [searchName]);

  const onChangeSearch = name => {
    history.push({ ...location, search: `name=${name}` });
  };

  return (
    <>
      <Searchbar onSubmit={onChangeSearch} />
      {movies && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <NavLink to={`${url}/${id}`}>
                <p>{title}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
