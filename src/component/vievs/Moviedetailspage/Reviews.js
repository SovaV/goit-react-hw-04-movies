import { useEffect, useState } from 'react';
import * as fetchAPI from '../../services/Film-api';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchAPI.fetchReviews(movieId).then(res => {
      setReviews(res.results);
    });
  }, [movieId]);

  return (
    <>
      <div>
        {reviews.length !== 0 ? (
          <ul>
            {reviews.map(({ author, content, id }) => (
              <li key={id}>
                <span>
                  <b>Author: </b> {author}
                </span>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We do not have any reviews for this movie.</p>
        )}
      </div>
    </>
  );
}
