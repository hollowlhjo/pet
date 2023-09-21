import React, { useEffect, useState } from "react";
import Search from "./search";
import { string } from "yup";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favourites, setFavourites] = useState<number[]>([]);

  const handleAddToFavorites = (movieId: number) => {
    const storedFavoritesString = localStorage.getItem('favorites');
    const storedFavorites: number[] = storedFavoritesString ? JSON.parse(storedFavoritesString) : [];
    const updatedFavorites = [...storedFavorites, movieId];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "89fb00a7179879e61d76ce1f542de91e";
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Популярні фільми</h1>
      <Search></Search>
      <div style={{ display: "flex", flexWrap: "wrap", position: "absolute" , left: "95px"}}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ width: "200px", margin: "10px", height:"400px"}}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <a href="#" style={{color: "black", margin: "10px", display: "block"}}>{movie.title}</a>
            <button onClick={() => handleAddToFavorites(movie.id)}>Додати в улюблені</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
