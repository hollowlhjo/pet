import React, { useState } from "react";
import {Link} from "react-router-dom"

interface Movie {
    id: number;
    title: string;
    poster_path: string;
  }

const Search : React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      };
      const handleSearch = async () => {
        if (searchTerm.trim() === '') {
          setMovies([]);
          return;
        }
      
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=89fb00a7179879e61d76ce1f542de91e`
          );
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
      return(
        <div style={{marginBottom: "10px"}}>
        <input
            type="text"
            placeholder="Введіть назву фільму"
            value={searchTerm}
            onChange={handleSearchChange}
        />
        <Link to={`/results?query=${searchTerm}`}>
            <button onClick={handleSearch}>Search</button>
        </Link>
        </div>
      )

}

export default Search