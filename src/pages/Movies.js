import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  console.log(movies);

  // console.log(searchParams);
  const query = searchParams.get('query') ?? '';

  // https://api.themoviedb.org/3/movie/659?language=en-US

  // https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key

  const baseURL = 'https://api.themoviedb.org/3';
  const API_KEY = 'd25c90b85b8f344798ffe413cdb42b7f';

  useEffect(() => {
    fetch(
      `${baseURL}search/movie?query=${searchQuery}?language=en-US&api_key=${API_KEY}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return toast.error('Ops, something went wrong!');
      })
      .then(data => {
        console.log(data);
        // console.log(data.results);
        // setMovies(data.results);
      });
  }, [searchQuery]);

  const location = useLocation();

  const updateQueryString = e => {
    const { value } = e.target;

    return value !== ''
      ? setSearchParams({ query: value })
      : setSearchParams({});
  };

  const onSubmit = e => {
    e.preventDefault();

    console.log(searchParams.get('query'));
    setSearchQuery(searchParams.get('query'));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={query}
          onChange={updateQueryString}
          // onChange={evt => {
          //   setSearchParams({ query: evt.target.value });
          // }}
        />
        <button type="submit">search</button>
      </form>
      <ToastContainer />
      {/* {movies.map(movie => {
        return (
          <li key={movie}>
            <Link to={`${movie}`} state={{ from: location }}>
              {movie}
            </Link>
          </li>
        );
      })} */}
      ;
    </div>
  );
};

export default Movies;

// Як записати значення input'у в url
// Як це значення записати знову в input в залженості від того, чи є який текст ('іфвфв') чи ні ('')
// Як стоврювати кнопку 'назад'?//
// проблема із новою вклакою і рішення
