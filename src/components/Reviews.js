import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Reviews = () => {
  const [status, setStatus] = useState('idle');
  const [reviews, setReviews] = useState([]);
  const { movieID } = useParams();

  const baseURL = 'https://api.themoviedb.org/3';
  const API_KEY = 'd25c90b85b8f344798ffe413cdb42b7f';

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(
          `${baseURL}/movie/${movieID}/reviews?language=en-US&page=1&api_key=${API_KEY}`
        );
        if (!response.ok) {
          return new Error('Oops, something went wrong');
        }

        const movies = await response.json();

        const ShorteredReviews = movies.results.splice(0, 4);
        setReviews(ShorteredReviews);

        setStatus('resolved');
      } catch (error) {
        console.log(error);
        setStatus('rejected');
      }
    };

    fetchReview();
  }, [movieID]);
  return (
    <>
      {status === 'resolved' && (
        <ul>
          {reviews.length > 0 ? (
            reviews.map(({ id, author, content }) => {
              return (
                <li key={id}>
                  <div>
                    <h1>{author}</h1>
                    <p>{content}</p>
                  </div>
                </li>
              );
            })
          ) : (
            <p>There are no reviews</p>
          )}
        </ul>
      )}
      {status === 'rejected' && <h1>Something went wrong</h1>}
    </>
  );
};

export default Reviews;
