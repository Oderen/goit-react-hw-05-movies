import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { useRef, Suspense, useEffect, useState } from 'react';
import css from './MovieDetails.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieDetails = () => {
  // const params = useParams();
  // console.log(params);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  const { movieID } = useParams();

  const [movies, setMovies] = useState({});

  // /2jUOA4mUm2W7jP61DFeZ77kH0sA.jpg -- картинка

  const baseURL = 'https://api.themoviedb.org/3';
  const API_KEY = 'd25c90b85b8f344798ffe413cdb42b7f';

  useEffect(() => {
    fetch(`${baseURL}/movie/700?language=en-US&api_key=${API_KEY}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        // console.log(data);
        setMovies(data);
        // console.log(data.title ?? data.name);
      })
      .catch(error => {
        console.log(error);
        return toast.error('Ops, something went wrong!');
      });
  }, []);

  // console.log(movieID);

  {
    /* Оператор "Елвіс" -- '?' */
  }
  {
    /* location.state?.from ?? '/movies' */
  }
  {
    /* Інший варіант {/* {location.state && location.state.from} */
  }

  return (
    <div>
      <Link to={backLinkLocationRef.current}>Go Back</Link>

      {/* <div className={css.movieDetailsContainer}>
        <div className={css.image}></div>
        <div>
          <h1>
            {movies.title ?? movies.name}
            {movies.release_date ? (
              movies.release_date.slice(0, 4)
            ) : (
              <p>No Info</p>
            )}
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
      </div> */}

      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
