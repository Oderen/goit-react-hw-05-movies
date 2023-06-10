import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import css from './'

const Home = () => {
  const [movies, setMovies] = useState([]);

  const baseURL = 'https://api.themoviedb.org/3';
  const API_KEY = 'd25c90b85b8f344798ffe413cdb42b7f';

  useEffect(() => {
    fetch(
      `${baseURL}/trending/all/day?language=en-US&page=1&api_key=${API_KEY}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return toast.error('Ops, something went wrong!');
      })
      .then(data => {
        // console.log(data);
        // console.log(data.results);
        setMovies(data.results);
      });
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {movies.map(({ title, id, name }) => {
          return (
            <li key={id}>
              <Link>{title ?? name}</Link>
            </li>
          );
        })}
      </ul>

      <ToastContainer />
    </>
  );
};

export default Home;
