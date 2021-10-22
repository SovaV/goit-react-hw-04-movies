import { useEffect, useState } from 'react-router';
import * as fetchAPI from '../services/Film-api';

export default function Reviews({ moviesId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchAPI.fetchReviews(moviesId).then(data => {
      setReviews(data.results);
    });
  }, [moviesId]);

  return (
    <>
      <p>We do not have any reviews for this movie.</p>
    </>
  );
}
