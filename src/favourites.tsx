import React, { useState, useEffect } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Favorites: React.FC = () => {
  const [movieDetails, setMovieDetails] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavoritesString = localStorage.getItem('favorites');
    const storedFavorites: number[] = storedFavoritesString ? JSON.parse(storedFavoritesString) : [];

    const fetchMovieDetails = async (movieId: number) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=89fb00a7179879e61d76ce1f542de91e`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
      }
    };

    const fetchDetailsForStoredFavorites = async () => {
      const detailsPromises = storedFavorites.map((movieId) => fetchMovieDetails(movieId));
      const details = await Promise.all(detailsPromises);
      setMovieDetails(details.filter((detail) => detail !== null));
    };

    fetchDetailsForStoredFavorites();
  }, []);

  return (
    <div>
      <h1>Улюблені</h1>
      <div style={{ display: "flex", flexWrap: "wrap", position: "absolute" , left: "95px"}}>
        {movieDetails.map((movie) => (
          <div key={movie.id} style={{ width: "200px", margin: "10px", height:"400px"}}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <a href="#" style={{color: "black", margin: "10px", display: "block"}}>{movie.title}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;