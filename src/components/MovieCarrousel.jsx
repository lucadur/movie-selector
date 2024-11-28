import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import MovieCard from './MovieCard';

/* eslint-disable react/prop-types */
const MovieCarousel = ({ title, apiEndpoint, isFavorites }) => {
  const [movies, setMovies] = useState([]);
  const favorites = useSelector((state) => state.favorites); 

  const moviesToDisplay = isFavorites ? favorites : movies;

  useEffect(() => {
    if (!isFavorites && apiEndpoint) {
      const fetchMovies = async () => {
        try {
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmJkMmY1ODcwNmY3ZTg2NDc0MDRhM2ZkZThhZTZiZCIsIm5iZiI6MTczMjUzMDY1NC44MzA4MjcyLCJzdWIiOiI2NzQ0NTEwMDlmNDBhN2FhZjZlYTU2YTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.70dHYC1i8K1oaLjaos_dtHFHQu4IPJ-qp3FAo-44vKI', // Remplace avec ta clé API
            },
          };

          const response = await axios.get(apiEndpoint, options);
          setMovies(response.data.results);
        } catch (error) {
          console.error('Failed to fetch movies', error);
        }
      };

      fetchMovies();
    }
  }, [apiEndpoint, isFavorites]); 

  return (
    <div>
      <h2 className='text-white text-2xl font-bold mb-5'>{title}</h2>
      {moviesToDisplay.length > 0 ? (
        <Swiper
          spaceBetween={50}
          slidesPerView={5}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Navigation, Pagination]}
          className='mb-10'
        >
          {moviesToDisplay.map((movie) => (
  <SwiperSlide key={`favorite-${movie.id}`}>
    <MovieCard
      title={movie.title}
      posterPath={movie.poster_path} 
      releaseDate={movie.release_date}
      overview={movie.overview}
      voteaverage={movie.vote_average}
      votecount={movie.vote_count}
      movieId={movie.id}
    />
  </SwiperSlide>
))}
        </Swiper>
      ) : (
        <p className="text-white">{isFavorites ? 'Aucun film ajouté aux favoris.' : 'Aucun film à afficher.'}</p>
      )}
    </div>
  );
};

export default MovieCarousel;
