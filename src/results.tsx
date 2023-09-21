import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Search from "./search";

const Results: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (query) {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=89fb00a7179879e61d76ce1f542de91e`
          );
          const data = await response.json();
          if (data.results) {
            setMovies(data.results);
          }
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div>
      <h1>Результати пошуку</h1>
      <Search></Search>
      <p>Запит: {query}</p>
      {movies && movies.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", position: "absolute" , left: "95px"}}>
          {movies.map((movie: any) => (
            <div key={movie.id} style={{ width: "200px", margin: "10px", height:"400px"}}>
              <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "100%" }}
                />
              <a style={{color:"black"}} href={`/movie/${movie.id}`}>{movie.title}</a>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default Results;