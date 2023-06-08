import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { useRef, Suspense } from 'react';

const MovieDetails = () => {
  // const params = useParams();
  // console.log(params);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  const { movieID } = useParams();
  //   console.log(movieID);
  return (
    <>
      {/* Оператор "Елвіс" -- '?' */}
      {/* location.state?.from ?? '/movies' */}
      {/* Інший варіант {/* {location.state && location.state.from} */}
      <Link to={backLinkLocationRef.current}>Go Back</Link>
      <h1>Фільм: {movieID}</h1>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
