import { Outlet, Link, useParams } from 'react-router-dom';

const MovieDetails = () => {
  // const params = useParams();
  // console.log(params);

  const { movieID } = useParams();
  //   console.log(movieID);
  return (
    <>
      <h1>Фільм: {movieID}</h1>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetails;
