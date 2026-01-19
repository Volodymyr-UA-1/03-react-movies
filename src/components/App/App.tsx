import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (topic: string) => {
    try {
      setLoading(true);
      setError(false);
      setMovies([]); // очищаємо попередні результати

      const data = await fetchMovies(topic);

      if (data.length === 0) {
        toast.error("No movies found for your request.", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
      }

      setMovies(data);
    } catch (err) {
      setError(true);
      toast.error("Failed to fetch movies. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.appContainer}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage />}

      {loading ? (
        <div className={css.loaderWrapper}>
          <Loader text="Searching for movies..." />
        </div>
      ) : (
        movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleSelectMovie} />
        )
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}