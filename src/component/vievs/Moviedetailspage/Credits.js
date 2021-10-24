import { useEffect, useState } from 'react';
import * as fetchAPI from '../../services/Film-api';
import errorPhoto from '../../img/no_poster.jpg';
import m from './Moviedetailspage.module.css';

export default function Credits({ movieId }) {
  const [names, setName] = useState([]);
  useEffect(() => {
    fetchAPI.fetchCredits(movieId).then(res => {
      setName(res.cast);
    });
  }, [movieId]);

  return (
    <>
      <div>
        {names.length !== 0 ? (
          <ul className={m.credits_list}>
            {names.map(({ name, profile_path, id, character }) => (
              <li key={id}>
                <img
                  className={m.credits_img}
                  src={
                    profile_path ? `https://image.tmdb.org/t/p/w300/${profile_path}` : errorPhoto
                  }
                  alt={name}
                />
                <p>Actors: {name}</p>
                <p>Character: {character}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>There is no data on the actors.</p>
        )}
      </div>
    </>
  );
}
