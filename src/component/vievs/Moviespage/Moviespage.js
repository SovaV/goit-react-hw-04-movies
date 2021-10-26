import { useState, useEffect } from 'react';
import { useHistory, useLocation, NavLink, useRouteMatch } from 'react-router-dom';
import * as fetchDetailsAPI from '../../services/Film-api';
import Searchbar from '../../Searchbar/Searchbar';
import errorFilm from '../../img/no_poster.jpg';
import m from './Moviespage.module.css';
import Spiner from '../../Loader/Loader';
const Status = {
  IDLE: 'idle', // стоїть на місці
  PENDING: 'pending', // очікується
  RESOLVED: 'resolved', // виконалось
  REJECTED: 'rejected', // відхилено
};
export default function Moviespage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const searchName = new URLSearchParams(location.search).get('name') ?? '';
  const [text, setText] = useState(searchName ?? '');
  useEffect(() => {
    if (!text) {
      return;
    }
    fetchDetailsAPI
      .fetchMovie(text, page)
      .then(response => {
        setMovies(prevState => [...prevState, ...response.results]);
        // setStatus(Status.PENDING);
        setStatus(Status.RESOLVED);
        if (page !== 1) {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }
        if (movies.total === 0) {
          return Promise.reject(new Error('не верный ввод'));
        }
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
    // .finally(() => {
    //   window.scrollTo({
    //     top: document.body.scrollHeight,
    //     behavior: 'smooth',
    //   });
    // });
  }, [text, page]);

  const onChangeSearch = name => {
    if (name === text) return;
    setText(name);
    setMovies([]);
    setPage(1);
    history.push({ ...location, search: `name=${name}` });
  };
  const btnFetch = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <>
      <Searchbar onSubmit={onChangeSearch} />
      {status === Status.PENDING && <Spiner />}
      {status === Status.RESOLVED && (
        <ul className={m.list}>
          {movies.map(({ id, title, poster_path }) => (
            <li key={id} className={m.item}>
              <NavLink
                to={{
                  pathname: `${url}/${id}`,
                  state: { from: location },
                }}
              >
                <img
                  className={m.img}
                  src={poster_path ? `https://image.tmdb.org/t/p/w300` + poster_path : errorFilm}
                  alt={title}
                />
                <p className={m.text}>{title}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      ;
      {movies.length !== 0 && (
        <button type="button" onClick={btnFetch} className={m.btn}>
          Load More
        </button>
      )}
    </>
  );
}

// import { useState, useEffect } from 'react';
// import { useHistory, useLocation, NavLink, useRouteMatch } from 'react-router-dom';
// import * as fetchDetailsAPI from '../../services/Film-api';
// import Searchbar from '../../Searchbar/Searchbar';
// import errorFilm from '../../img/no_poster.jpg';
// import m from './Moviespage.module.css';

// export default function Moviespage() {
//   const [movies, setMovies] = useState(null);

//   const [error, setError] = useState();
//   // const [status, setStatus] = useState(Status.IDLE);
//   const { url } = useRouteMatch();
//   const history = useHistory();
//   const location = useLocation();
//   const [page, setPage] = useState(1);
//   const searchName = new URLSearchParams(location.search).get('name') ?? '';
//   const [userName, setUserName] = useState(searchName ?? '');

//   useEffect(() => {
//     if (!searchName) return;

//     getData();
//   }, [searchName]);

//   const getData = () => {
//     fetchDetailsAPI.fetchMovie(searchName, page).then(response => {

//       setMovies(response.results);
//     });
//     setPage(prev => prev + 1);
//   };

//   const onChangeSearch = newName => {
//     if (newName === userName) return;
//     setUserName(newName);
//     setMovies([]);
//     setPage(1);

//     history.push({ ...location, search: `name=${newName}` });
//   };

//   return (
//     <>
//       <Searchbar onSubmit={onChangeSearch} />
//       {movies && (
//         <ul>
//           {movies.map(({ id, title, poster_path }) => (
//             <li key={id}>
//               <NavLink
//                 to={{
//                   pathname: `${url}/${id}`,
//                   state: { from: location },
//                 }}
//               >
//                 <img
//                   className={m.img}
//                   src={poster_path ? `https://image.tmdb.org/t/p/w300` + poster_path : errorFilm}
//                   alt={title}
//                 />
//                 <p>{title}</p>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }
