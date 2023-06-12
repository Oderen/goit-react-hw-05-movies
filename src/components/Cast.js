import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Cast = () => {
  const [status, setStayus] = useState('idle');
  const [cast, setCast] = useState([]);
  const { movieID } = useParams();

  const baseURL = 'https://api.themoviedb.org/3';
  const API_KEY = 'd25c90b85b8f344798ffe413cdb42b7f';

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `${baseURL}/movie/${movieID}/credits?language=en-US&api_key=${API_KEY}`
        );
        if (!response.ok) {
          return new Error('Oops, something went wrong');
        }

        const movies = await response.json();
        setCast(movies);

        const ShorteredMovie = movies.cast.splice(0, 4);
        setCast(ShorteredMovie);
        setStayus('resolved');
      } catch (error) {
        console.log(error);
        setStayus('rejected');
      }
    };

    fetchCast();
  }, [movieID]);
  return (
    <>
      {status === 'resolved' && (
        <ul>
          {cast.length > 0 &&
            cast.map(({ cast_id, profile_path, name, character }) => {
              return (
                <li key={cast_id}>
                  <div>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                      alt={`${name}`}
                      width="100px"
                      heigth="150px"
                    />
                    <p>character: {character}</p>
                    <p>name: {name}</p>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
      {status === 'rejected' && <h1>Something went wrong</h1>}
    </>
  );
};

export default Cast;
