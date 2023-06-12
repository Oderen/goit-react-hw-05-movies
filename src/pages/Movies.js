import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();

  const baseURL = 'https://api.themoviedb.org/3';
  const API_KEY = 'd25c90b85b8f344798ffe413cdb42b7f';

  useEffect(() => {
    fetch(
      `${baseURL}/search/movie?query=${searchQuery}&language=en-US&api_key=${API_KEY}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return new Error('Oops, something went wrong!');
      })
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        console.log(error.message);
        toast.error('Oops, something went wrong!');
      });
  }, [searchQuery]);

  const updateQueryString = e => {
    const { value } = e.target;

    return value !== ''
      ? setSearchParams({ query: value })
      : setSearchParams({});
  };

  const onSubmit = e => {
    e.preventDefault();

    setSearchQuery(searchParams.get('query'));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={query} onChange={updateQueryString} />
        <button type="submit">search</button>
      </form>
      <ToastContainer />
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`${movie.id}`} state={{ from: location }}>
                {movie.title ?? movie.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Movies;
