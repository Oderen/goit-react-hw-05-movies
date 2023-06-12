import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { useRef, Suspense, useEffect, useState } from 'react';
import css from './MovieDetails.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieDetails = () => {
  const { movieID } = useParams();
  const [movies, setMovies] = useState({});
  const [status, setStatus] = useState('idle');

  const location = useLocation();

  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  const baseURL = 'https://api.themoviedb.org/3';
  const API_KEY = 'd25c90b85b8f344798ffe413cdb42b7f';

  useEffect(() => {
    const fecthMovieDetails = async () => {
      try {
        const response = await fetch(
          `${baseURL}/movie/${movieID}?language=en-US&api_key=${API_KEY}`
        );
        if (!response.ok) {
          return new Error('Something went wrong');
        }
        const data = await response.json();
        setMovies(data);
        return setStatus('resolved');
      } catch (error) {
        console.log(error);
        toast.error('Ops, something went wrong!');
        return setStatus('rejected');
      }
    };

    fecthMovieDetails();
  }, [movieID]);

  // Оператор "Елвіс" -- '?'
  // location.state?.from ?? '/movies'
  // Інший варіант {/* {location.state && location.state.from}

  return (
    <div>
      <Link to={backLinkLocationRef.current}>Go Back</Link>

      {status === 'resolved' && (
        <>
          <div className={css.movieDetailsContainer}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
              alt="film poster"
            />
            <div>
              <h1>
                {movies.title ?? movies.name} (
                {movies.release_date ? (
                  movies.release_date.slice(0, 4)
                ) : (
                  <p>No Info</p>
                )}
                )
              </h1>
              <p>User score: {Math.round(movies.vote_average * 10)}%</p>
              <h2>Overview</h2>
              <p>{movies.overview}</p>
              <h2>Genres</h2>
              <p>
                {movies.genres &&
                  movies.genres.map(({ id, name }) => (
                    <span key={id} className={css.genresItem}>
                      {name}
                    </span>
                  ))}
              </p>
            </div>
          </div>

          <div className={css.addInfoContainer}>
            <h2>Additional information</h2>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
          </div>
        </>
      )}

      {status === 'rejected' && <h1>A problem occurs</h1>}

      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
