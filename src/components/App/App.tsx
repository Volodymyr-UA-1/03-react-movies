import css from "./App.module.css"
import SearchBar from "../SearchBar/SearchBar"
import toast,{Toaster} from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMesage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleSearch = async (topic: string) => {
    try {
      setLoading(true);
      setMovies([]);
      setError(false);
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
      console.log("Шукаємо фільм:", topic);
    } catch (error) {
      setError(true);
      toast.error("Failed to fetch movies. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Обробка вибору фільму
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie); // <-- відкриваємо модалку
  };

  // Закриття модалки
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.appContainer}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />

      {loading && <Loader text="Loading movies, please wait..." />}
      {error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {/* MovieModal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
