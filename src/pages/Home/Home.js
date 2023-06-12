import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');

  const location = useLocation();

  const baseURL = 'https://api.themoviedb.org/3';
  const API_KEY = 'd25c90b85b8f344798ffe413cdb42b7f';

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await fetch(
          `${baseURL}/trending/all/day?language=en-US&page=1&api_key=${API_KEY}`
        );
        if (!response.ok) {
          toast.error('Ops, something went wrong!');
          return new Error('Error');
        }
        const data = await response.json();
        setMovies(data.results);
        setStatus('resolved');
      } catch (error) {
        console.log(error);
        setStatus('rejected');
        return <h1>error</h1>;
      }
    };

    fetchHome();
  }, []);

  return (
    <>
      {status === 'resolved' && (
        <>
          <h1>Trending today</h1>
          <ul>
            {movies.map(({ title, id, name }) => {
              return (
                <li key={id}>
                  <Link to={`movies/${id}`} state={{ from: location }}>
                    {title ?? name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {status === 'rejected' && <h1>A problem occured</h1>}
      <ToastContainer />
    </>
  );
};

export default Home;
