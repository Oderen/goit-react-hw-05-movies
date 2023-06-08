// import { Link } from 'react-router-dom';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams);
  const query = searchParams.get('query') ?? '';

  const [movies, setMovies] = useState(['movie-1', 'movie-2']);
  // console.log(movies);

  const filteredMovies = movies.filter(movie => movie.includes(query));
  // console.log(filteredMovies);

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
      {filteredMovies.map(movie => {
        return (
          <li key={movie}>
            <Link to={`${movie}`} state={{ from: location }}>
              {movie}
            </Link>
          </li>
        );
      })}
      ;
    </div>
  );
};

export default Movies;

// Як записати значення input'у в url
// Як це значення записати знову в input в залженості від того, чи є який текст ('іфвфв') чи ні ('')
// Як стоврювати кнопку 'назад'?//
// проблема із новою вклакою і рішення
