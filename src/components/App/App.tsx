import css from "./App.module.css"
import SearchBar from "../SearchBar/SearchBar"
import toast,{Toaster} from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";


export default function App() {
   const [movies, setMovies] = useState<Movie[]>([]);
  const handleSearch = async (topic: string) => {
    const data = await fetchMovies(topic);
    if (data.length === 0) {
  toast.error("No movies found for your request.", {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
            
  });        
}
    console.log("Шукаємо фільм:", topic);
    setMovies(data);
  };
const handleSelectMovie = (movie: Movie) => {
    console.log("Вибрано фільм для перегляду:", movie.title);
  };
  return (
    <div className={css.appContainer}>
      <Toaster
        position="top-center"
        reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
    </div>
  );
  
}

