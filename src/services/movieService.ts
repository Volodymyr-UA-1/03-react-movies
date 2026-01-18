import axios from "axios";
import type { Movie } from "../types/movie.ts";

const API_TOKEN = "Bearer";

interface MoviesHttpResponse{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export const fetchMovies = async (topic: string): Promise<Movie[]> => {
    try {
        const response = await axios.get<MoviesHttpResponse>(
            `https://api.themoviedb.org/3/search/movie`,
            {
                params: {
                    query: topic,
                    language: "en-US",
                    page: 1,
                },
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            }
        );
        return response.data.results;
    }
    catch (error) {
        console.error("Error fetching movies:", error);
        throw error; // Прокидаємо помилку далі, щоб App.tsx міг показати toast
    }
};
    
