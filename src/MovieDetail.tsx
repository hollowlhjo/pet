import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from './moviedetailsHelp';

interface MovieDetailProps {
  // Додайте необхідні поля для відображення деталей фільму
}

const MovieDetail: React.FC<MovieDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id && parseInt(id, 10);
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (movieId) {
        try {
          const response = await getMovieDetails(movieId);
          setMovie(response);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      }
    };
  
    fetchMovieDetails();
  }, [movieId]);
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
    </div>
  );
};

export default MovieDetail;